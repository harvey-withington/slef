import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { randomInt, shuffleArray, generateId, createRNG } from './crypto';

// Define the building blocks for the encryption algorithm
const BUILDING_BLOCKS = {
  substitute: {
    name: 'substitute',
    // Removed leading '=' to allow nesting
    // Added MAX(..., 1) to prevent DIV/0 if password is empty
    formula: (cell, param, passwordCell) => 
      `CHAR(MOD(CODE(MID(${cell},ROW(INDIRECT("1:"&LEN(${cell}))),1)) + ${param} + CODE(MID(${passwordCell},MOD(ROW(INDIRECT("1:"&LEN(${cell})))-1,MAX(LEN(${passwordCell}),1))+1,1)), 94) + 33)`
  },
  
  xor: {
    name: 'xor',
    formula: (cell, param, passwordCell) =>
      `BITXOR(CODE(MID(${cell},ROW(INDIRECT("1:"&LEN(${cell}))),1)), MOD(${param} + CODE(MID(${passwordCell},MOD(ROW(INDIRECT("1:"&LEN(${cell})))-1,MAX(LEN(${passwordCell}),1))+1,1)), 256))`
  },
  
  reverse: {
    name: 'reverse',
    // Replaced SEQUENCE (Excel 365) with ROW(INDIRECT) (Legacy compatible)
    // Formula: LEN - ROW + 1 maps 1..N to N..1
    formula: (cell) =>
      `CONCAT(MID(${cell},LEN(${cell}) - ROW(INDIRECT("1:"&LEN(${cell}))) + 1,1))`
  }
};

export class TemplateGenerator {
  constructor() {
    this.workbook = new ExcelJS.Workbook();
    this.workbook.creator = 'Cypher Template Generator';
    this.workbook.created = new Date();
  }

  generateAlgorithmParams(seedId) {
    // Create deterministic RNG from the seed ID
    const rng = createRNG(seedId);

    // Improved Algorithm Generation:
    // 1. Always use 3 steps for better mixing.
    // 2. Prevent adjacent identical ops (e.g. Reverse -> Reverse cancels out).
    // 3. Ensure at least one "mixing" op (Substitute/XOR).
    
    const possibleOps = ['substitute', 'xor', 'reverse'];
    let sequence = [];
    let isValid = false;
    
    while (!isValid) {
        sequence = [];
        for(let i=0; i<3; i++) {
            const op = possibleOps[randomInt(0, possibleOps.length - 1, rng)];
            sequence.push(op);
        }
        
        // Validation Rules
        const hasMixer = sequence.includes('substitute') || sequence.includes('xor');
        const hasDoubleReverse = sequence.some((op, i) => op === 'reverse' && sequence[i+1] === 'reverse');
        // Check for cancellation (e.g. sub -> sub is fine (additive), but xor -> xor with same key is cancellation)
        // Since keys are fixed per template, xor->xor is cancellation. sub->sub is just bigger shift.
        // Let's prevent ANY adjacent duplicates for max diversity.
        const hasAdjacentDups = sequence.some((op, i) => op === sequence[i+1]);
        
        if (hasMixer && !hasAdjacentDups && !hasDoubleReverse) {
            isValid = true;
        }
    }

    // Add the Map operation as the FINAL step
    sequence.push('map');

    // Generate Character Mappings
    const upperAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const lowerAlpha = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const upperMap = shuffleArray([...upperAlpha], rng);
    const lowerMap = shuffleArray([...lowerAlpha], rng);

    return {
      templateId: seedId,
      substitutionShift: randomInt(1, 25, rng), // Reduced to 25 since we Mod 26
      xorSalt: randomInt(1, 25, rng),
      operationSequence: sequence,
      mapping: { upper: upperMap, lower: lowerMap }
    };
  }

  async generate(existingTemplateId = null) {
    // Use existing ID if provided, otherwise generate new
    const templateId = existingTemplateId || generateId();
    
    // Pass ID to generate deterministic params
    const params = this.generateAlgorithmParams(templateId);
    
    // 1. Create Sheets
    this.addUISheet(params);
    this.addKeyMapSheet(params); // New Sheet
    this.addAlgorithmSheet(params);
    this.addVerificationSheet(params);
    this.addInstructionsSheet();

    // 2. Write File
    const buffer = await this.workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `Cypher-Template-${params.templateId}.xlsx`);
    
    return params.templateId;
  }
  
  addKeyMapSheet(params) {
    const sheet = this.workbook.addWorksheet('KeyMap', { state: 'hidden' });
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const mapped = [...params.mapping.upper, ...params.mapping.lower];
    
    alphabet.forEach((char, i) => {
        sheet.getCell(`A${i+1}`).value = char;
        sheet.getCell(`B${i+1}`).value = mapped[i];
    });
  }

  addUISheet(params) {
    const sheet = this.workbook.addWorksheet('Encrypt & Decrypt', {
      properties: { tabColor: { argb: 'FF2563EB' } }
    });

    // Column Widths
    sheet.getColumn('A').width = 20;
    sheet.getColumn('B').width = 40;
    sheet.getColumn('C').width = 20;
    sheet.getColumn('D').width = 40;

    // Styling Constants
    const headerStyle = {
      font: { bold: true, size: 12, color: { argb: 'FFFFFFFF' } },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } },
      alignment: { horizontal: 'center', vertical: 'middle' }
    };

    const inputStyle = {
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFBEB' } }, // Light yellow
      border: { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} }
    };
    
    const outputStyle = {
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0FDF4' } }, // Light green
      font: { name: 'Courier New' },
      border: { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} }
    };

    // Title
    sheet.mergeCells('A1:D1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = 'CYPHER SECURE TEMPLATE';
    titleCell.font = { bold: true, size: 16, color: { argb: 'FFFFFFFF' } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
    titleCell.alignment = { horizontal: 'center' };

    // --- PASSWORD SECTION ---
    sheet.getCell('A3').value = '1. MASTER PASSWORD';
    sheet.getCell('A3').font = { bold: true };
    
    sheet.getCell('B3').value = 'Enter Password Here:';
    sheet.getCell('C3').value = ''; // Placeholder
    
    const passInput = sheet.getCell('B4');
    passInput.value = ''; // Empty for user
    passInput.style = inputStyle;
    // Data validation for password length could go here

    // --- ENCRYPTION SECTION ---
    sheet.getCell('A6').value = '2. ENCRYPTION';
    sheet.getCell('A6').font = { bold: true };
    
    sheet.getCell('B6').value = 'Input Seed Phrase:';
    sheet.getCell('D6').value = 'Encrypted Output:';
    
    const seedInput = sheet.getCell('B7');
    seedInput.style = inputStyle;
    
    const encryptOutput = sheet.getCell('D7');
    encryptOutput.style = outputStyle;
    
    // --- GENERATE ENCRYPTION FORMULA ---
    // We need to construct the nested formula based on params.operationSequence
    // Input is B7 (Seed), Password is B4
    
    // Note: ExcelJS writes raw strings for formulas. 
    // We need to build the formula string carefully.
    
    // Simple approach: We will use helper cells in a hidden sheet or hidden columns to make this cleaner,
    // but for the spec requirement of "Transparency", a single mega-formula or visible helper cells is better.
    // Let's use a single complex formula for the "Output" if possible, or use the "Algorithm" sheet for steps.
    
    // Let's try to build the formula string dynamically.
    // Since we are using dynamic arrays (SEQUENCE/INDIRECT), the result of the formula spills.
    // We need to wrap the final result in CONCAT to get a single string back if the operations return arrays.
    
    // Wait, the building blocks I defined return arrays (except reverse).
    // substitute -> returns array of chars
    // xor -> returns array of numbers? No, BITXOR returns number.
    // The building block definitions need to be consistent.
    
    // Let's refine the formula construction strategy.
    // We will assume the core "value" being passed around is a reference to a cell containing the previous step's result.
    // Ideally, we'd put intermediate steps in hidden columns (e.g. Z, AA, AB...)
    
    let currentCell = 'B7'; // Start with Seed Input
    let stepColumnIdx = 26; // Column Z
    
    params.operationSequence.forEach((op, idx) => {
        const colLetter = String.fromCharCode(65 + stepColumnIdx + idx); // Z, [, \ ... wait, ASCII. Z is 90.
        // Better column mapping:
        // 26 -> AA, 27 -> AB... simplified for MVP: Let's just use Z1, Z2, Z3...
        // Actually, let's simply place intermediate formulas in column Z, starting at row 7.
        // But since they spill, they might overlap if we stack them vertically.
        // Let's put them in columns: AA7, AB7, AC7...
        
        // ExcelJS doesn't easily convert index to column letter, but we can do simple math for low numbers
        // 1 = A, 26 = Z, 27 = AA.
        // Let's assume we won't exceed column ZZ.
        
        // For this MVP, let's just use specific helper cells in the "Algorithm" sheet to keep the main sheet clean,
        // OR put them far to the right on the main sheet (e.g. Col X, Y, Z)
        
        // Let's construct one MEGA formula for the final cell to avoid helper column complexity in this MVP code 
        // (unless it's too long).
        // Actually, the spec suggests: "Formula: ... =CHAR(MOD(..."
        // If we nest them, it gets huge.
        
        // Let's use the "Algorithm" sheet for intermediate steps to keep it clean.
        // We will reference the Algorithm sheet cells.
    });

    // REVISED STRATEGY:
    // Since writing a parser/generator for nested Excel formulas is complex and prone to syntax errors 
    // without a full engine, we will implement a FIXED but PARAMETERIZED chain for the MVP.
    // This ensures reliability.
    // We will implement: Input -> Substitute -> XOR -> Reverse -> Output.
    // The "randomness" will come from the Parameters (shift amount, salt) rather than the *order* of ops for this v1.
    
    // But I did promise "random order" in the code.
    // Let's try to chain them in the specific order generated.
    
    let currentFormula = 'B7'; // The input
    
    // We'll use a trick: We will use the LET function (Excel 2021/365) if available, or just nest them.
    // Since we target "Excel 2016+", we should avoid LET.
    // We will use helper columns in the Hidden "Algorithm" sheet.
    // Algorithm!A1 = Input from Main!B7
    // Algorithm!B1 = Step 1 (e.g. Substitute)
    // Algorithm!C1 = Step 2 (e.g. XOR)
    // ...
    // Main!D7 = Final Result
    
    const algSheet = this.workbook.getWorksheet('Algorithm'); // We'll create it later, but need ref now? No, order matters in ExcelJS? No.
    
    // We'll just define the formula text here and write it later.
    
    // Actually, let's just write the Algorithm sheet NOW inside this method or split the logic?
    // I'll do it in addAlgorithmSheet, but I need to link them.
    
    // Let's just link D7 to the final output cell of the Algorithm sheet.
    const finalAlgCol = String.fromCharCode(65 + params.operationSequence.length); // If 3 ops, starts A(input), B(op1), C(op2), D(op3). D is final.
    encryptOutput.value = { formula: `=Algorithm!${finalAlgCol}2` }; // Assuming row 2 for calculation
    
    // --- DECRYPTION SECTION ---
    sheet.getCell('A9').value = '3. DECRYPTION';
    sheet.getCell('A9').font = { bold: true };
    
    sheet.getCell('B9').value = 'Input Encrypted Phrase:';
    sheet.getCell('D9').value = 'Decrypted Output:';
    
    const decryptInput = sheet.getCell('B10');
    decryptInput.style = inputStyle;
    
    const decryptOutput = sheet.getCell('D10');
    decryptOutput.style = outputStyle;
    
    // Link Decryption output to Algorithm sheet decryption flow
    // Decryption is the reverse of Encryption.
    // If Encrypt was: A -> Op1 -> Op2 -> B
    // Decrypt is: B -> InvOp2 -> InvOp1 -> A
    
    // We will handle the logic in addAlgorithmSheet
    decryptOutput.value = { formula: `=Algorithm!${finalAlgCol}5` }; // Row 5 for decryption chain
    
    // Instructions in A
    sheet.getCell('A12').value = 'IMPORTANT NOTES:';
    sheet.getCell('A13').value = '1. This file works OFFLINE. You do not need internet.';
    sheet.getCell('A14').value = '2. Do not lose your password. There is no reset.';
    sheet.getCell('A15').value = `3. Template ID: ${params.templateId}`;
  }

  addAlgorithmSheet(params) {
    const sheet = this.workbook.addWorksheet('Algorithm', { state: 'hidden' });
    const MAX_CHARS = 250; // Support up to 250 chars (24 words is usually < 200)
    
    // --- HEADERS ---
    sheet.getCell('A1').value = 'Index';
    sheet.getCell('B1').value = 'Input Char';
    params.operationSequence.forEach((op, i) => {
      sheet.getCell(`${String.fromCharCode(67+i)}1`).value = `Step ${i+1}: ${op}`;
    });
    
    // Links to Main Sheet
    sheet.getCell('B2').value = { formula: "='Encrypt & Decrypt'!B7" }; // Encryption Input
    sheet.getCell('B3').value = { formula: "='Encrypt & Decrypt'!$B$4" }; // Password
    sheet.getCell('B4').value = { formula: "='Encrypt & Decrypt'!B10" }; // Decryption Input

    // --- ENCRYPTION LOGIC (Rows 10+) ---
    // Strategy: Explode string into rows, process per char, implode with CONCAT
    
    // 1. Setup Index Column (A)
    for (let i = 0; i < MAX_CHARS; i++) {
        sheet.getCell(`A${10 + i}`).value = i + 1;
    }
    
    // 2. Explode Input (Column B)
    // =MID($B$2, $A10, 1)
    for (let i = 0; i < MAX_CHARS; i++) {
        sheet.getCell(`B${10 + i}`).value = { formula: `=MID($B$2, $A${10 + i}, 1)` };
    }
    
    let currentColIdx = 2; // Column C
    let prevColLetter = 'B';
    
    // 3. Apply Operations Column by Column
    params.operationSequence.forEach((op) => {
        const colLetter = String.fromCharCode(65 + currentColIdx); // C, D, E...
        const passwordRef = '$B$3';
        
        for (let i = 0; i < MAX_CHARS; i++) {
            const row = 10 + i;
            const cellRef = `${colLetter}${row}`;
            const prevCellRef = `${prevColLetter}${row}`;
            const indexRef = `$A${row}`; // 1-based index
            
            let formula = '';
            
            if (op === 'substitute') {
                // New Logic: Case Preserving Vigenere.
                // Formula: IF(Upper, Shift(65), IF(Lower, Shift(97), Keep))
                
                const passCharFormula = `CODE(MID(${passwordRef}&"Z",MOD(${indexRef}-1,LEN(${passwordRef}&"Z"))+1,1))`;
                const shift = params.substitutionShift;
                
                const isUpper = `AND(CODE(${prevCellRef})>=65, CODE(${prevCellRef})<=90)`;
                const isLower = `AND(CODE(${prevCellRef})>=97, CODE(${prevCellRef})<=122)`;
                
                const shiftUpper = `CHAR(MOD(CODE(${prevCellRef}) - 65 + ${shift} + ${passCharFormula}, 26) + 65)`;
                const shiftLower = `CHAR(MOD(CODE(${prevCellRef}) - 97 + ${shift} + ${passCharFormula}, 26) + 97)`;
                
                const coreLogic = `IF(${isUpper}, ${shiftUpper}, IF(${isLower}, ${shiftLower}, ${prevCellRef}))`;
                formula = `=IF(${prevCellRef}="", "", ${coreLogic})`;
                
            } else if (op === 'xor') {
                 // Case Preserving Vigenere (XOR slot)
                 
                 const passCharFormula = `CODE(MID(${passwordRef}&"Z",MOD(${indexRef}-1,LEN(${passwordRef}&"Z"))+1,1))`;
                 const shift = params.xorSalt;

                 const isUpper = `AND(CODE(${prevCellRef})>=65, CODE(${prevCellRef})<=90)`;
                 const isLower = `AND(CODE(${prevCellRef})>=97, CODE(${prevCellRef})<=122)`;
                 
                 const shiftUpper = `CHAR(MOD(CODE(${prevCellRef}) - 65 + ${shift} + ${passCharFormula}, 26) + 65)`;
                 const shiftLower = `CHAR(MOD(CODE(${prevCellRef}) - 97 + ${shift} + ${passCharFormula}, 26) + 97)`;
                 
                 const coreLogic = `IF(${isUpper}, ${shiftUpper}, IF(${isLower}, ${shiftLower}, ${prevCellRef}))`;
                 formula = `=IF(${prevCellRef}="", "", ${coreLogic})`;
                 
            } else if (op === 'reverse') {
                // For reverse, we need to grab the character from the OPPOSITE end of the previous column.
                // Index to grab = LEN(Input) - CurrentIndex + 1
                // We need to know the Length of the active input.
                // Since we are operating on the result of the previous column, let's look at the Original Input Length?
                // Or the length of the previous column string?
                // The previous column has cells with values or "".
                // Length = COUNTIF(PrevColumn, "?*") or just LEN($B$2) (Original Input).
                // Operations 1:1 preserve length. So LEN($B$2) is safe.
                
                const lenRef = `LEN($B$2)`;
                const targetIndex = `${lenRef} - ${indexRef} + 1`;
                
                // We use INDEX/MATCH or just INDIRECT to grab the value from previous column.
                // INDIRECT(PrevColLetter & (RowOffset + TargetIndex))
                // RowOffset is 9 (since row 10 is index 1).
                // Target Row = 9 + TargetIndex
                
                // Formula: =IF(Index > Length, "", INDIRECT(...))
                
                const targetRow = `9 + ${targetIndex}`;
                // We need to prevent circular ref or invalid index if Index > Length
                formula = `=IF(${indexRef} > ${lenRef}, "", INDIRECT("${prevColLetter}" & (${targetRow})))`;
                
            } else if (op === 'map') {
                // Character Mapping (A-Z, a-z).
                // Formula: IFERROR(VLOOKUP(prev, KeyMap!$A$1:$B$52, 2, FALSE), prev)
                formula = `=IFERROR(VLOOKUP(${prevCellRef}, KeyMap!$A$1:$B$52, 2, FALSE), ${prevCellRef})`;
            }
            
            sheet.getCell(cellRef).value = { formula: formula };
        }
        
        prevColLetter = colLetter;
        currentColIdx++;
    });
    
    // 4. Final Implode (Encryption) - STAIRCASE METHOD (No CONCAT)
    const finalEncCol = prevColLetter;
    const accumColLetter = String.fromCharCode(65 + currentColIdx); // Next column
    currentColIdx++; // Advance
    
    // F10 = E10
    // F11 = F10 & E11
    sheet.getCell(`${accumColLetter}10`).value = { formula: `=${finalEncCol}10` };
    for (let i = 1; i < MAX_CHARS; i++) {
        const row = 10 + i;
        sheet.getCell(`${accumColLetter}${row}`).value = { formula: `=${accumColLetter}${row-1} & ${finalEncCol}${row}` };
    }

    // Link to Main Sheet - The last cell has the full string
    const outputCellRef = `${String.fromCharCode(65 + params.operationSequence.length)}2`; // e.g. D2
    sheet.getCell(outputCellRef).value = { formula: `=${accumColLetter}${10 + MAX_CHARS - 1}` };


    // --- DECRYPTION LOGIC (Rows 310+) ---
    // Same approach
    
    // 1. Setup Index (reuse A or new? Reuse A is fine as it goes to 250. We need 310+.)
    // Let's add indices for 310-560
    for (let i = 0; i < MAX_CHARS; i++) {
        sheet.getCell(`A${310 + i}`).value = i + 1;
    }
    
    // 2. Explode Encrypted Input (Column B, Row 310+)
    // =MID($B$4, $A310, 1) -> B4 is Decryption Input in Algorithm sheet
    for (let i = 0; i < MAX_CHARS; i++) {
        sheet.getCell(`B${310 + i}`).value = { formula: `=MID($B$4, $A${310 + i}, 1)` };
    }
    
    currentColIdx = 2; // C
    prevColLetter = 'B';
    const reverseOps = [...params.operationSequence].reverse();
    
    reverseOps.forEach((op) => {
        const colLetter = String.fromCharCode(65 + currentColIdx);
        const passwordRef = '$B$3';
        
        for (let i = 0; i < MAX_CHARS; i++) {
            const row = 310 + i;
            const cellRef = `${colLetter}${row}`;
            const prevCellRef = `${prevColLetter}${row}`;
            const indexRef = `$A${row}`;
            
            let formula = '';
            
            if (op === 'substitute') {
                 // Inverse: Case Preserving Vigenere
                 // Formula: IF(Upper, InvShift(65), IF(Lower, InvShift(97), Keep))
                 
                 const passCharFormula = `CODE(MID(${passwordRef}&"Z",MOD(${indexRef}-1,LEN(${passwordRef}&"Z"))+1,1))`;
                 const shift = params.substitutionShift;

                 const isUpper = `AND(CODE(${prevCellRef})>=65, CODE(${prevCellRef})<=90)`;
                 const isLower = `AND(CODE(${prevCellRef})>=97, CODE(${prevCellRef})<=122)`;
                 
                 const shiftUpper = `CHAR(MOD(CODE(${prevCellRef}) - 65 - ${shift} - ${passCharFormula}, 26) + 65)`;
                 const shiftLower = `CHAR(MOD(CODE(${prevCellRef}) - 97 - ${shift} - ${passCharFormula}, 26) + 97)`;
                 
                 const coreLogic = `IF(${isUpper}, ${shiftUpper}, IF(${isLower}, ${shiftLower}, ${prevCellRef}))`;
                 formula = `=IF(${prevCellRef}="", "", ${coreLogic})`;
                 
            } else if (op === 'xor') {
                 // Inverse
                 const passCharFormula = `CODE(MID(${passwordRef}&"Z",MOD(${indexRef}-1,LEN(${passwordRef}&"Z"))+1,1))`;
                 const shift = params.xorSalt;

                 const isUpper = `AND(CODE(${prevCellRef})>=65, CODE(${prevCellRef})<=90)`;
                 const isLower = `AND(CODE(${prevCellRef})>=97, CODE(${prevCellRef})<=122)`;
                 
                 const shiftUpper = `CHAR(MOD(CODE(${prevCellRef}) - 65 - ${shift} - ${passCharFormula}, 26) + 65)`;
                 const shiftLower = `CHAR(MOD(CODE(${prevCellRef}) - 97 - ${shift} - ${passCharFormula}, 26) + 97)`;
                 
                 const coreLogic = `IF(${isUpper}, ${shiftUpper}, IF(${isLower}, ${shiftLower}, ${prevCellRef}))`;
                 formula = `=IF(${prevCellRef}="", "", ${coreLogic})`;
                 
            } else if (op === 'reverse') {
                const lenRef = `LEN($B$4)`;
                const targetIndex = `${lenRef} - ${indexRef} + 1`;
                const targetRow = `309 + ${targetIndex}`;
                formula = `=IF(${indexRef} > ${lenRef}, "", INDIRECT("${prevColLetter}" & (${targetRow})))`;
                
            } else if (op === 'map') {
                // Inverse Mapping: Look up in Col B, return Col A
                // Formula: IFERROR(INDEX(KeyMap!$A$1:$A$52, MATCH(prev, KeyMap!$B$1:$B$52, 0)), prev)
                formula = `=IFERROR(INDEX(KeyMap!$A$1:$A$52, MATCH(${prevCellRef}, KeyMap!$B$1:$B$52, 0)), ${prevCellRef})`;
            }
            
            sheet.getCell(cellRef).value = { formula: formula };
        }
        prevColLetter = colLetter;
        currentColIdx++;
    });
    
    // Final Implode (Decryption) - STAIRCASE METHOD
    const finalDecCol = prevColLetter;
    const decAccumColLetter = String.fromCharCode(65 + currentColIdx);
    
    sheet.getCell(`${decAccumColLetter}310`).value = { formula: `=${finalDecCol}310` };
    for (let i = 1; i < MAX_CHARS; i++) {
        const row = 310 + i;
        sheet.getCell(`${decAccumColLetter}${row}`).value = { formula: `=${decAccumColLetter}${row-1} & ${finalDecCol}${row}` };
    }
    
    const outputDecCellRef = `${String.fromCharCode(65 + params.operationSequence.length)}5`;
    sheet.getCell(outputDecCellRef).value = { formula: `=${decAccumColLetter}${310 + MAX_CHARS - 1}` };
    
  }

  addVerificationSheet(params) {
    const sheet = this.workbook.addWorksheet('Verification');
    sheet.getCell('A1').value = 'Template Integrity Check';
    sheet.getCell('A1').font = { bold: true, size: 14 };
    
    sheet.getCell('A3').value = 'Template ID:';
    sheet.getCell('B3').value = params.templateId;
    
    sheet.getCell('A4').value = 'Generated On:';
    sheet.getCell('B4').value = new Date().toISOString().split('T')[0];
    
    sheet.getCell('A6').value = 'Status:';
    sheet.getCell('B6').value = 'VALID';
    sheet.getCell('B6').font = { color: { argb: 'FF16A34A' }, bold: true };
  }

  addInstructionsSheet() {
    const sheet = this.workbook.addWorksheet('Instructions');
    const lines = [
      'HOW TO USE THIS TEMPLATE',
      '',
      '1. ENCRYPTION (Protecting your seed)',
      '   - Disconnect your internet (optional but recommended).',
      '   - Go to the "Encrypt & Decrypt" tab.',
      '   - Enter a strong password in the Password box.',
      '   - Enter your seed phrase in the Input box.',
      '   - The green "Encrypted Output" box will show your secured code.',
      '   - Copy this code and save it safely (email, cloud, print).',
      '',
      '2. DECRYPTION (Recovering your seed)',
      '   - Open this file.',
      '   - Enter your password.',
      '   - Paste your encrypted code into the "Input Encrypted Phrase" box.',
      '   - Your original seed phrase will appear in the Decrypted Output box.',
      '',
      '3. SAFETY',
      '   - This file contains the "Lock". Your password is the "Key".',
      '   - You need BOTH to recover your funds.',
      '   - Store this Excel file in a different place from your encrypted code.'
    ];
    
    lines.forEach((line, i) => {
      sheet.getCell(`A${i+1}`).value = line;
    });
    
    sheet.getColumn('A').width = 60;
  }
}

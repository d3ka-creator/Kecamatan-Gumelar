import test from 'node:test';
import assert from 'node:assert/strict';
import { generateTicketCode, calculateSLADate } from './ticketGenerator.ts';

test('generateTicketCode produces expected prefix and format', () => {
  const codeAdm = generateTicketCode('ADM');
  const codeAdu = generateTicketCode('ADU');

  assert.match(codeAdm, /^GML-ADM-\d{4}-\d{4}$/);
  assert.match(codeAdu, /^GML-ADU-\d{4}-\d{4}$/);
});

test('calculateSLADate skips weekends correctly', () => {
  // 2026-10-23 is a Friday
  const friday = new Date(2026, 9, 23); // month is 0-indexed: 9 = Oct
  const slaTwoDays = calculateSLADate(friday, 2);
  // Friday + 1 work day = Monday (2026-10-26), + 2 work days = Tuesday (2026-10-27)
  assert.equal(slaTwoDays, '2026-10-27');
});

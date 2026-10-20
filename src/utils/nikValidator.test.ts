import test from 'node:test';
import assert from 'node:assert/strict';
import { validateNIK, validateKK } from './nikValidator.ts';

test('validateNIK rejects empty or invalid length strings', () => {
  assert.equal(validateNIK('').isValid, false);
  assert.equal(validateNIK('12345').isValid, false);
  assert.equal(validateNIK('330217010190000A').isValid, false);
});

test('validateNIK correctly identifies male gender and Banyumas province/regency code', () => {
  // 33: Jateng, 02: Banyumas, 17: Gumelar, 15: Day 15 (Male), 08: Aug, 92: 1992, 0001: Serial
  const result = validateNIK('3302171508920001');
  assert.equal(result.isValid, true);
  assert.equal(result.parsedData?.gender, 'L');
  assert.equal(result.parsedData?.birthDay, 15);
  assert.equal(result.parsedData?.birthMonth, 8);
  assert.equal(result.parsedData?.birthYear, 1992);
  assert.equal(result.parsedData?.isBanyumasOrigin, true);
});

test('validateNIK correctly identifies female gender with +40 day offset', () => {
  // 33: Jateng, 02: Banyumas, 17: Gumelar, 52 (12+40): Female Day 12, 05: May, 98: 1998, 0002
  const result = validateNIK('3302175205980002');
  assert.equal(result.isValid, true);
  assert.equal(result.parsedData?.gender, 'P');
  assert.equal(result.parsedData?.birthDay, 12);
  assert.equal(result.parsedData?.birthMonth, 5);
  assert.equal(result.parsedData?.birthYear, 1998);
});

test('validateKK validates 16 digit format correctly', () => {
  assert.equal(validateKK('3302170101010001').isValid, true);
  assert.equal(validateKK('123').isValid, false);
  assert.equal(validateKK('').isValid, false);
});

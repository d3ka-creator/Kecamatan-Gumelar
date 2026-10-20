export interface NIKValidationResult {
  isValid: boolean;
  message: string;
  parsedData?: {
    provinceCode: string;
    regencyCode: string;
    districtCode: string;
    gender: 'L' | 'P';
    birthDate: string; // YYYY-MM-DD
    birthYear: number;
    birthMonth: number;
    birthDay: number;
    serialNumber: string;
    isBanyumasOrigin: boolean;
  };
}

/**
 * Validates Indonesian NIK (Nomor Induk Kependudukan)
 * Structure: [2 digit Provinsi][2 digit Kab/Kota][2 digit Kecamatan][2 digit Tgl Lahir (+40 jika Perempuan)][2 digit Bulan][2 digit Tahun][4 digit Nomor Urut]
 */
export function validateNIK(nik: string): NIKValidationResult {
  const sanitized = (nik || '').trim();

  if (!sanitized) {
    return { isValid: false, message: 'NIK tidak boleh kosong' };
  }

  if (!/^\d{16}$/.test(sanitized)) {
    return { 
      isValid: false, 
      message: 'NIK harus terdiri dari tepat 16 digit angka' 
    };
  }

  const prov = sanitized.substring(0, 2);
  const kab = sanitized.substring(2, 4);
  const kec = sanitized.substring(4, 6);
  const rawDay = parseInt(sanitized.substring(6, 8), 10);
  const month = parseInt(sanitized.substring(8, 10), 10);
  const rawYear = parseInt(sanitized.substring(10, 12), 10);
  const serial = sanitized.substring(12, 16);

  // Gender & Day extraction (in Indonesian NIK, female day has +40 added)
  let day = rawDay;
  let gender: 'L' | 'P' = 'L';
  if (rawDay > 40) {
    gender = 'P';
    day = rawDay - 40;
  }

  if (day < 1 || day > 31) {
    return { isValid: false, message: 'Tanggal lahir pada NIK tidak valid' };
  }

  if (month < 1 || month > 12) {
    return { isValid: false, message: 'Bulan lahir pada NIK tidak valid' };
  }

  // Calculate century approximation (assuming cutoff 30: 00-30 -> 2000s, 31-99 -> 1900s)
  const fullYear = rawYear <= 30 ? 2000 + rawYear : 1900 + rawYear;
  const formattedDay = day.toString().padStart(2, '0');
  const formattedMonth = month.toString().padStart(2, '0');
  const birthDate = `${fullYear}-${formattedMonth}-${formattedDay}`;

  const isBanyumasOrigin = (prov === '33' && kab === '02');

  return {
    isValid: true,
    message: isBanyumasOrigin 
      ? 'NIK teridentifikasi sah wilayah Kabupaten Banyumas (Jawa Tengah)' 
      : 'Format NIK valid secara nasional',
    parsedData: {
      provinceCode: prov,
      regencyCode: kab,
      districtCode: kec,
      gender,
      birthDate,
      birthYear: fullYear,
      birthMonth: month,
      birthDay: day,
      serialNumber: serial,
      isBanyumasOrigin,
    }
  };
}

/**
 * Validates Kartu Keluarga (KK) format (16 digits)
 */
export function validateKK(kk: string): { isValid: boolean; message: string } {
  const sanitized = (kk || '').trim();
  if (!sanitized) {
    return { isValid: false, message: 'Nomor Kartu Keluarga tidak boleh kosong' };
  }
  if (!/^\d{16}$/.test(sanitized)) {
    return { isValid: false, message: 'Nomor KK harus 16 digit angka sesuai standar Disdukcapil' };
  }
  return { isValid: true, message: 'Format Nomor Kartu Keluarga valid' };
}

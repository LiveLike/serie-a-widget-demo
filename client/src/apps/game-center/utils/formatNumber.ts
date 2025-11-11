//Formatting comma as thousand seperators
export function formatNumber(num: number | string) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// 100 => 100
// 1000 => 1,000
// 10000 => 10,000
// 100000 => 100,000
// 1000000 => 1,000,000

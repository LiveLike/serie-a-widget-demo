export function formatNumber(num: number | bigint) {
  const nf = new Intl.NumberFormat("en-US");
  return nf.format(num);
}

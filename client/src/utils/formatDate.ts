export function formatDate(
  inputDateString: Date | null | string | undefined | number
) {
  const date = new Date(inputDateString ?? "");

  const formattedDate = date.toLocaleDateString("en-GB", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  const [day, month, year] = formattedDate.split("/");
  const shortYear = year.slice(-2);
  const finalFormattedDate = `${day}/${month}/${shortYear}`;

  const shortFormattedDate = date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
  });

  return {
    formattedDate: finalFormattedDate,
    shortFormattedDate: shortFormattedDate,
  };
}

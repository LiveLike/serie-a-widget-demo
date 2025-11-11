export function formatDate(inputDateString: string | undefined | number) {
  const date = new Date(inputDateString ?? "");

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return {
    formattedDate: formattedDate,
  };
}

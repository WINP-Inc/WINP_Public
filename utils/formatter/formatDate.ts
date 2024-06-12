export const formatDate = (inputDate: Date | string): string => {
  const date = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;

  const day = date?.getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthIndex = date?.getMonth();
  const year = date?.getFullYear();

  return `${day} ${monthNames[monthIndex]}, ${year}`;
};

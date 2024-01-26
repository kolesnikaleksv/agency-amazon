const getDate = (value:string, type: string) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dateArr = value.split(' ')[0].split('-');
  const month = monthNames[+dateArr[1] - 1].slice(0, 3).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const fullDate = `${dateArr[2]} / ${month} / ${dateArr[0]}`;
  const shortDate = `${dateArr[1]} / ${dateArr[0].slice(2)}`;

  if(type === 'shortDate') {
    return shortDate;
  } else if (type === 'fullDate') {
    return fullDate;
  }
}

export default getDate;
export default function HoldersCard({
  name,
  cardNumber,
  month,
  year,
  cardDetails,
  isEmpty,
}) {
  function formatMonth(month) {
    if (month < 10) return `0${month}`;
    else return month;
  }

  return (
    <div className="card-box">
      <div className="card-logo-box">
        <svg
          width="84"
          height="47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="23.478" cy="23.5" rx="23.478" ry="23.5" fill="#fff" />
          <path
            d="M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z"
            stroke="#fff"
          />
        </svg>
      </div>
      <h2 className="card-number">
        {isEmpty
          ? cardNumber
            ? cardNumber
            : "0000 0000 0000 0000"
          : cardDetails.cardNumber === ""
          ? "0000 0000 0000 0000"
          : cardDetails.cardNumber}
      </h2>
      <div className="card-detail">
        <strong>
          {isEmpty
            ? name
              ? name
              : "Jane Appleseed"
            : cardDetails.name === ""
            ? "Jane Appleseed"
            : cardDetails.name}
        </strong>
        <strong>
          {isEmpty
            ? month
              ? formatMonth(month)
              : "00"
            : cardDetails.month === ""
            ? "00"
            : formatMonth(cardDetails.month)}
          /
          {isEmpty
            ? year
              ? year
              : "00"
            : cardDetails.year === ""
            ? "00"
            : cardDetails.year}
        </strong>
      </div>
    </div>
  );
}

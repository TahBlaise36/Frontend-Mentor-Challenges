import { useState } from "react";
import HoldersCard from "./HoldersCard";

export default function App() {
  return (
    <div className="container">
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCVC] = useState("");
  const [cardDetails, setCardDetails] = useState({});
  const [validCredetials, setValidCredetials] = useState(false);

  const isEmpty = Object.keys(cardDetails).length === 0;

  console.log(cardDetails);

  function handleSubmit(e) {
    e.preventDefault();

    const credentials = {
      name,
      cardNumber,
      month,
      year,
      cvc,
    };

    setCardDetails(credentials);

    // setName("");
    // setCardNumber("");
    // setMonth("");
    // setYear("");
    // setCVC("");

    if (name && cardNumber && month && year && cvc) {
      setValidCredetials(true);
    }
  }

  return (
    <>
      <div className="image-box">
        <HoldersCard
          name={name}
          cardNumber={cardNumber}
          month={month}
          year={year}
          cvc={cvc}
          cardDetails={cardDetails}
          isEmpty={isEmpty}
        />
        <div className="back-card-box"></div>
      </div>
      <div className="form-details-box">
        {validCredetials ? (
          <Confirmation />
        ) : (
          <CardDetails
            name={name}
            cardNumber={cardNumber}
            month={month}
            year={year}
            cvc={cvc}
            cardDetails={cardDetails}
            onSetMonth={setMonth}
            onSetYear={setYear}
            onSetCVC={setCVC}
            onSetName={setName}
            onSetCardNumber={setCardNumber}
            onhandleSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
}

function CardDetails({
  name,
  cardNumber,
  month,
  year,
  cvc,
  cardDetails,
  onSetMonth,
  onSetYear,
  onSetCVC,
  onSetName,
  onSetCardNumber,
  onhandleSubmit,
}) {
  function formatCreaditCardNumber(e) {
    const input = e.target;
    const cleanedValue = input.value.replace(/\s/g, "");
    const groups = cleanedValue.match(/.{1,4}/g);
    const formattedValue = groups ? groups.join(" ") : "";
    onSetCardNumber(formattedValue.length > 19 ? cardNumber : formattedValue);
  }

  function containsLetter(val) {
    // for (let i = 0; i < val?.length; i++) {
    //   if (isNaN(parseInt(val[i]))) {
    //     return true;
    //   }
    // }
    // return false;
    const cleanedValue = val.replace(/\s/g, "");
    const containsLetter = /[a-zA-Z]/.test(cleanedValue);

    if (containsLetter) return true;
    else return false;
  }

  // console.log(containsLetter("5775 6895 7645"));
  const isLetterPresent = containsLetter(
    cardDetails?.cardNumber ? cardDetails?.cardNumber : ""
  );

  return (
    <>
      <form className="card-details" onSubmit={onhandleSubmit}>
        <div className="form-element">
          <label>Cardholder Name</label>
          <Input
            className={cardDetails?.name === "" ? "invalid" : ""}
            type={"text"}
            value={name}
            onChange={(e) => onSetName(e.target.value)}
            placeholder={"e.g Jane Appleseed"}
            // cardDetails={cardDetails}
          />
          {cardDetails?.name === "" && (
            <span className="invalid-text">Please enter your name</span>
          )}
        </div>

        <div className="form-element">
          <label>Card Number</label>
          <Input
            className={cardDetails?.cardNumber === "" ? "invalid" : ""}
            type={"text"}
            value={cardNumber}
            onChange={(e) => formatCreaditCardNumber(e)}
            placeholder={"e.g. 9591 6489 6389 101E"}
          />
          {cardDetails?.cardNumber === "" || isLetterPresent ? (
            <span className="invalid-text">
              {isLetterPresent
                ? "Wrong format, numbers only"
                : "Please enter your card number"}
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="form-element form-element--date">
          <div>
            <label>exp. date (MM/YY)</label>
            <div className="exp-date">
              <Input
                className={cardDetails?.month === "" ? "invalid" : ""}
                type={"number"}
                value={month}
                onChange={(e) => onSetMonth(Number(e.target.value))}
                placeholder={"MM"}
              />

              <Input
                className={cardDetails?.year === "" ? "invalid" : ""}
                type={"number"}
                value={year}
                onChange={(e) => onSetYear(Number(e.target.value))}
                placeholder={"YY"}
              />
            </div>
            {(cardDetails?.month === "" || cardDetails?.year === "") && (
              <span className="invalid-text">Can't be blank</span>
            )}
          </div>

          <div>
            <label>cvc</label>
            <Input
              className={cardDetails?.cvc === "" ? "invalid" : ""}
              type={"number"}
              value={cvc}
              onChange={(e) => onSetCVC(Number(e.target.value))}
              placeholder={"e.g. 123"}
            />
            {cardDetails?.cvc === "" && (
              <span className="invalid-text">Can't be blank</span>
            )}
          </div>
        </div>
        <Button>Confirm</Button>
      </form>
    </>
  );
}

function Input(props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      className={`${props.className} ${
        isFocused ? (!props.value ? "invalid" : "valid") : ""
      }`}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder={props.placeholder}
    />
  );
}

function Confirmation() {
  return (
    <div className="card-details">
      <div className="confirmation">
        <div className="confirmation-icon-box">
          <svg
            className="confirmation-icon"
            width="80"
            height="80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="40" cy="40" r="40" fill="url(#a)" />
            <path d="M28 39.92 36.08 48l16-16" stroke="#fff" stroke-width="3" />
            <defs>
              <linearGradient
                id="a"
                x1="-23.014"
                y1="11.507"
                x2="0"
                y2="91.507"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#6348FE" />
                <stop offset="1" stop-color="#610595" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1>Thank you!</h1>
        <p>We've added your card details</p>
        <Button>Continue</Button>
      </div>
    </div>
  );
}

function Button({ children }) {
  return <button className="btn">{children}</button>;
}

import React, { useState } from 'react';

function Calculator() {
  // state to storage the values given by the user when filling the input fields
  const [userValues, setUserValues] = useState({
    amount: '',
    interest: '',
    months: '',
  });

  // state to storage the results of the calculation
  const [results, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    isResult: false,
  });

  // state to storage error message
  const [error, setError] = useState('');

  // event handler to update state when the user enters values

  const handleInputChange = (event) =>
    setUserValues({ ...userValues, [event.target.name]: event.target.value });

  // Manage validations and error messages
  const isValid = () => {
    const { amount, interest, months } = userValues;
    let actualError = '';
    // Validate if there are values
    if (!amount || !interest || !months) {
      actualError = 'All the values are required';
    }
    // Validade if the values are numbers
    if (isNaN(amount) || isNaN(interest) || isNaN(months)) {
      actualError = 'All the values must be a valid number';
    }
    // Validade if the values are positive numbers
    if (Number(amount) <= 0 || Number(interest) <= 0 || Number(months) <= 0) {
      actualError = 'All the values must be a positive number';
    }
    if (actualError) {
      setError(actualError);
      return false;
    }
    return true;
  };

  // Handle the data submited - validate inputs and send it as a parameter to the function that calculates the loan
  const handleSubmitValues = (e) => {
    e.preventDefault();
    if (isValid()) {
      setError('');
      calculateResults(userValues);
    }
  };

  // Calculation
  const calculateResults = ({ amount, interest, months }) => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(months);
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (
        monthly * calculatedPayments -
        userAmount
      ).toFixed(2);

      // Set up results to the state to be displayed to the user
      setResults({
        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
        isResult: true,
      });
    }
    return;
  };

  // Clear input fields
  const clearFields = () => {
    setUserValues({
      amount: '',
      interest: '',
      months: '',
    });

    setResults({
      monthlyPayment: '',
      totalPayment: '',
      totalInterest: '',
      isResult: false,
    });
  };

  return (
    <div className='calculator'>
      <div className='form'>
        <h1>Loan EMI Calculator</h1>
        {/* Display the error when it exists */}
        <p className='error'>{error}</p>
        <form onSubmit={handleSubmitValues}>
          {/* ternary operator manages when the calculator and results will be displayed to the user */}
          {!results.isResult ? (
            //   Form to collect data from the user
            <div className='form-items'>
              <div className="cal-container">
                <label id='label'>Loan Amount</label>
                <input
                  type='text'
                  name='amount'
                  placeholder='Enter amount'
                  value={userValues.amount}
                  // onChange method sets the values given by the user as input to the userValues state
                  onChange={handleInputChange}
                />
                <span>INR</span>
              </div>
              <div className="cal-container">
                <label id='label'>Loan Tenure</label>
                <input
                  type='text'
                  name='months'
                  placeholder='Enter months'
                  value={userValues.months}
                  onChange={handleInputChange}
                />
                <span>Months</span>
              </div>
              <div className="cal-container">
                <label id='label'>Interest Rate</label>
                <input
                  type='text'
                  name='interest'
                  placeholder='NN.NN'
                  value={userValues.interest}
                  onChange={handleInputChange}
                />
                <span>%</span>
              </div>
              <input type='submit' value='CALCULATE' className='button' />
            </div>
          ) : (
            //   Form to display the results to the user
            <div className='form-items'>
              <div>
              <div className="cal-container">
                <label id='label'>Loan Amount</label>
                <input
                  type='text'
                  name='amount'
                  placeholder='Enter amount'
                  value={userValues.amount}
                />
                <span>INR</span>
              </div>
              <div className="cal-container">
                <label id='label'>Loan Tenure</label>
                <input
                  type='text'
                  name='months'
                  placeholder='Enter months'
                  value={userValues.months}
                />
                <span>Months</span>
              </div>
              <div className="cal-container">
                <label id='label'>Interest Rate</label>
                <input
                  type='text'
                  name='interest'
                  placeholder='NN.NN'
                  value={userValues.interest}
                />
                <span>%</span>
              </div>
              <input
                className='button center'
                value='RESET'
                type='button'
                onClick={clearFields}
              />
              </div>
              <div>
                  <h1>Loan EMI Calculator</h1>
              <div className="container1">
                  <div className="details details1">
                    <h4>Loan EMI</h4>
                    <h4 disabled >₹{results.monthlyPayment}</h4>
                </div>
                <div className="details details2">
                    <h4>Total Interest Payable</h4>
                    <h4 disabled >₹{results.totalPayment}</h4>
                </div>
              </div>
                <div className="details details3">
                    <h4>Total Payment ( Principal + interest )</h4>
                    <h4 disabled >₹{results.totalInterest}</h4>
                </div>
            </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Calculator;
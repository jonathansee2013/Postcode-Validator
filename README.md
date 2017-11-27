# Australia Post Postcode Validator

This app can check whether or not the postcode, suburb and state entered is valid.

The goal is to create an online form using React that accepts a postcode, suburb and state.  When the user submits the form, it should check the inputs with the [Australia Post API](https://developers.auspost.com.au/apis/pac/reference/postcode-search) to validate that it is a valid address.

Tests to pass:

Check that the entered postcode matches the suburb. If not display an error message.  For example "The postcode 2000 does not match the suburb Broadway".

Check that the entered suburb matches the state.  If not display an error message.  For example: "The suburb Ferntree Gully does not exist in the state Tasmania"

If the postcode, suburb and state match, then display a success message.  For example: "The postcode, suburb and state entered are valid".


## How to Run the Project Locally

**Familiar with Git?**

Checkout this repo, install dependencies, then start the process with the following:

```
> git clone https://github.com/jonathansee2013/Postcode-Validator.git
> cd Postcode-Validator
> npm install
> npm start
```

Open another tab in the terminal in the same directory and:

```
> node proxy.js
```

**Not Familiar with Git?**

Click here then download the .zip file. Extract the contents of the zip file, then open your terminal, change to the project directory, and:

```
> npm install
> npm start`
```

Open another tab in the terminal in the same directory and:

```
> node proxy.js
```

## API used

[Australia Post API](https://developers.auspost.com.au/apis/pac/reference/postcode-search)

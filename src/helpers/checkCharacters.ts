const checkCharacters = (value:string) => {

    const regex = /[^a-zA-Z0-9\s]/;
  
    return regex.test(value);
  }

export default checkCharacters
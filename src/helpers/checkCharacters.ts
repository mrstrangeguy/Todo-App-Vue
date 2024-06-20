const checkCharacters = (value:string) => {

    let check = false;
    let characters = 'abcdefghijklmnopqrstuvwxyz1234567890 ';
    for(let i = 0;i<value.length;i++) {
      
     if(value[i]!==" " && characters.indexOf(value[i].toLocaleLowerCase()) === -1) {
      check = true;
      break;
     }
    }

    return check;
  }

export default checkCharacters
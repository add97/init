import phoneFormatter from 'phone-formatter';
phone = {
  format(num) {
     return phoneFormatter.format(num, "(NNN) NNN-NNNN");
  },
  unformat(num){
    return num.replace('(', '').replace(')', '').replace(/-/g, '');
  }
};

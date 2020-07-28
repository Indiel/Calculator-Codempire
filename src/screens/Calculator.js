import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CalcButton from '../components/CalcButton';
import Display from '../components/Display';

const Calculator = () => {
  const [shownText, setShownText] = useState('0');
  const [saveText, setSaveText] = useState('0');

  const addToDisplay = (text) => {
    setShownText((prev) => {
      const arr = prev.split(' ');

      if (/[A-Za-z]$/.test(arr[arr.length - 1])) {
        return prev;
      }

      switch (text) {
        case 'mc':
          setSaveText('0');
          return prev;
        
        case 'mr':
          arr[arr.length - 1] = saveText;
          return arr.join(' ');

        case 'm+':
          const elemP = arr.reverse().find((elem) => elem.match(/[0-9]$/));
          setSaveText((prevSave) => Number(prevSave) + Number(elemP));
          return prev;

        case 'm-':
          const elemM = arr.reverse().find((elem) => elem.match(/[0-9]$/));
          setSaveText((prevSave) => Number(prevSave) - Number(elemM));
          return prev;
        
        case '+/-':
          if (arr[arr.length - 1].charAt(0) === '-') {
            arr[arr.length - 1] = arr[arr.length - 1].slice(1);
            return arr.join(' ');
          } else {
            arr[arr.length - 1] = `-${arr[arr.length - 1]}`;
            return arr.join(' ');
          }

        case '+':
        case '-':
        case '*':
        case '/':
          if (arr[arr.length - 1] === '' 
            && (arr[arr.length - 2] === '+'
            || arr[arr.length - 2] === '-'
            || arr[arr.length - 2] === '*'
            || arr[arr.length - 2] === '/')
          ) {
            arr[arr.length - 2] = text;
            return arr.join(' ');
          } else if (arr[0] == 0 || arr[arr.length - 1] === '') {
            return prev;
          } else {
            return `${prev} ${text} `;
          }

        case '%':
          if (arr[arr.length - 1] !== '0' 
            && /[0-9]$/.test(arr[arr.length - 1])
          ) {
            if (arr.length <= 1) {
              return '0';
            }
            return prev + text;
          } else {
            return prev;
          }
        
        case '.':
          if (!arr[arr.length - 1].includes('.')
            && /[0-9]$/.test(arr[arr.length - 1])
          ) {
            return prev + text;
          } else {
            return prev;
          }

        case '0':
          if (arr[arr.length - 1] === '0') {
            return prev;
          }
      
        default:
          if (arr[arr.length - 1].includes('%')) {
            return prev;
          } else if (arr.length === 1 && arr[0] === '0') {
            return text;
          } else if (arr[arr.length - 1] === '0') {
            arr[arr.length - 1] = text;
            return arr.join(' ');
          } else {
            return prev + text;
          }
      }
    });
  };

  const clearDisplay = (text) => {
    setShownText('0');
  };

  const calculate = () => {
    setShownText((prev) => {
      const arr = prev.split(' ');
      if (arr.length <= 1) {
        return arr.join();
      }

      const calcPercent = (a, b) => {
        if (/%$/.test(b)) {
          b = a / 100 * Number(b.slice(0, -1));
        }
        return b;
      };

      for (let i = 0; i < arr.length; i++) {
        switch (arr[i]) {
          case "*":
            arr[i + 1] = calcPercent(arr[i - 1], arr[i + 1]);
            arr.splice(i - 1, 3, Number(arr[i - 1]) * Number(arr[i + 1]));
            i = i - 2;
            break;

          case '/':
            arr[i + 1] = calcPercent(arr[i - 1], arr[i + 1]);
            arr.splice(i - 1, 3, Number(arr[i - 1], 10) / Number(arr[i + 1], 10));
            i = i - 2;
            break;

          default:
            break;
        }
      }

      for (let i = 0; i < arr.length; i++) {
        switch (arr[i]) {
          case "+":
            arr[i + 1] = calcPercent(arr[i - 1], arr[i + 1]);
            arr.splice(i - 1, 3, Number(arr[i - 1]) + Number(arr[i + 1]));
            i = i - 2;
            break;

          case '-':
            arr[i + 1] = calcPercent(arr[i - 1], arr[i + 1]);
            if (i === 0) {
              arr.splice(i, 2, (- Number(arr[i + 1])));
              i = i - 1;
            } else {
              arr.splice(i - 1, 3, Number(arr[i - 1]) - Number(arr[i + 1]));
              i = i - 2;
            }
            break;

          default:
            break;
        }
      }

      // let decimal = arr[0].toString().includes('.') 
      //   ? arr[0].toString().split('.').pop().length
      //   : 0;
      // if (decimal > 5) {
      //   decimal = 5;
      // }

      // if (decimal) {
      //   arr[0] = arr[0].toFixed(decimal);
      // }

      return arr.join();
    });
  };

  return (
    <View style={styles.container}>
      <Display text={shownText} />

      <View style={styles.buttons}>
        <CalcButton text="AC" background="#A5A5A5" func={clearDisplay} />
        <CalcButton text="+/-" background="#A5A5A5" func={addToDisplay} />
        <CalcButton text="%" background="#A5A5A5" func={addToDisplay} />
        <CalcButton text="/" background="#FD9B0A" func={addToDisplay} />

        <CalcButton text="mc" func={addToDisplay} />
        <CalcButton text="mr" func={addToDisplay} />
        <CalcButton text="m-" func={addToDisplay} />
        <CalcButton text="m+" background="#FD9B0A" func={addToDisplay} />

        <CalcButton text="7" func={addToDisplay} />
        <CalcButton text="8" func={addToDisplay} />
        <CalcButton text="9" func={addToDisplay} />
        <CalcButton text="*" background="#FD9B0A" func={addToDisplay} />
        
        <CalcButton text="4" func={addToDisplay} />
        <CalcButton text="5" func={addToDisplay} />
        <CalcButton text="6" func={addToDisplay} />
        <CalcButton text="-" background="#FD9B0A" func={addToDisplay} />

        <CalcButton text="1" func={addToDisplay} />
        <CalcButton text="2" func={addToDisplay} />
        <CalcButton text="3" func={addToDisplay} />
        <CalcButton text="+" background="#FD9B0A" func={addToDisplay} />

        <CalcButton text="0" width={"46%"} func={addToDisplay} />
        <CalcButton text="." func={addToDisplay} />
        <CalcButton text="=" background="#FD9B0A" func={calculate} />
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  buttons: {
    flexDirection: "row",
    flexWrap:"wrap",
    justifyContent: "space-around",
  },
  text: {

  },
});

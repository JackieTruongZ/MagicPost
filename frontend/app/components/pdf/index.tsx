import React, { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Item {
  [key: string]: string | number;
  iname: string;
  quantity: string;
  amount: string;
  total: number;
}

function PdfRender() {
  const [item, setItem] = React.useState<Item[]>([
    { iname: '', quantity: '', amount: '', total: 0 },
  ]);
  const [billTotal, setBillTotal] = React.useState<number>(0);

  useEffect(() => {
    setBillTotal(() => {
      let data = [...item];
      let temp = 0;
      for (let i = 0; i < data.length; i++) {
        temp = parseFloat(data[i].total.toString()) + temp;
      }
      return parseFloat(temp.toFixed(2));
    });
  }, [item]);

  function handleChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    let data = [...item];
    data[index][event.target.name] = event.target.value;
    data[index].total = parseFloat(
      (parseFloat(data[index].quantity) * parseFloat(data[index].amount)).toFixed(2)
    );
    setItem(data);
  }

  function removeEntry(index: number) {
    let data = [...item];
    data.splice(index, 1);
    setItem(data);
  }

  function addItem() {
    const newItem: Item = { iname: '', quantity: '', amount: '', total: 0 };
    setItem((oldValue) => {
      const newArray = [...oldValue];
      newArray.push(newItem);
      return newArray;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const doc = new jsPDF();
    let newArray: any[][] = [];
    for (let i = 0; i < item.length; i++) {
      newArray.push([i + 1, item[i].iname, item[i].quantity, item[i].amount, item[i].total]);
    }
    doc.text('N.A.K Vessels shop', 70, 20);
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = new Date(`${mm}/${dd}/${yyyy}`);
    doc.text(`Date: ${today.toLocaleDateString()}`, 200, 25, null, null, 'right');
    doc.text(`Customer name: Murugan`, 200, 30, null, null, 'right');
    autoTable(doc, {
      head: [['S.no', 'Item name', 'Quantity', 'Amount', 'Total']],
      body: newArray,
      startY: 35,
    });
    let finalY = doc.lastAutoTable.finalY;
    doc.text(`Total amount to be paid: ${billTotal}`, 12, finalY + 10);
    doc.save('Bill.pdf');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="App">
        {item.map((input, index) => (
          <div key={index}>
            <input
              name="iname"
              placeholder="item name"
              value={input.iname}
              onChange={(event) => handleChange(index, event)}
            ></input>
            <input
              name="quantity"
              type="number"
              pattern="[0-9]*"
              step=".001"
              min=".000"
              max="999.999"
              placeholder="quantity"
              value={input.quantity}
              onChange={(event) => handleChange(index, event)}
            ></input>
            <input
              name="amount"
              type="number"
              pattern="[0-9]*"
              step=".01"
              min=".01"
              max="99999.99"
              placeholder="amount"
              value={input.amount}
              onChange={(event) => handleChange(index, event)}
            ></input>
            <input name="total" placeholder="total" value={input.total} readOnly></input>
            <button key={index} onClick={() => removeEntry(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addItem}>
          Add+
        </button>
        <h3>Total amount: {billTotal ? billTotal : 0}</h3>
        <button type="submit">submit</button>
      </div>
    </form>
  );
}

export default PdfRender;
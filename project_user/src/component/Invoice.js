import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Homepage extends Component {

  state = {
    data: [],
    ship: 10000
  }

  componentDidMount(){
    var id = cookies.get('userID');
    axios.post('http://localhost:8000/datainvoice', {
      iduser: id
    }).then((ambilData) => {
      this.setState({
        data: ambilData.data
      })
      console.log(this.state.data)
    })
  }

  render() {

    if(cookies.get('userID') === undefined){
      return <Redirect to="/login" />
    }

    const invoice = this.state.data.map((item, index) => {
      var noInvoice = item.kode_invoice;
      var nama = item.nama_lengkap;
      var alamat = item.alamat;
      var email = item.email;
      var payment = item.payment;
      var deliv = item.delivery;
      var orderdate = item.waktu_co;

      return  <div className="invoice">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="invoice-title">
                      <h2>Invoice</h2><h3 className="pull-right">Order # {noInvoice}</h3>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-xs-6">
                          <address>
                          <strong>Billed To:</strong><br />
                          {nama}<br />
                          {alamat}<br />
                          </address>
                      </div>
                      <div className="col-xs-6 text-right">
                          <address>
                          <strong>Shipped To:</strong><br />
                          {nama}<br />
                          {alamat}<br />
                          </address>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-6">
                          <address>
                          <strong>Payment Method:</strong><br />
                          {payment}<br />
                          {email}<br /><br />
                          <strong>Delivery Method:</strong><br />
                          {deliv}<br />
                          </address>
                      </div>
                      <div className="col-xs-6 text-right">
                        <address>
                        <strong>Order Date:</strong><br />
                        {orderdate}<br /><br />
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    })

    const barang = this.state.data.map((item, index) => {
      var namaproduk = item.nama_produk;
      var hargaproduk = item.harga_barang;
      var qty = item.qty;
      var subtotal = item.subtotal;
      var total = Number(subtotal) + Number(this.state.ship);
      
      return <div className="row">
      <div className="col-md-12">
          <div className="panel panel-default">
          <div className="panel-heading">
              <h3 className="panel-title"><strong>Order summary</strong></h3>
          </div>
          <div className="panel-body">
              <div className="table-responsive">
              <table className="table table-condensed">
                  <thead>
                  <tr>
                      <td><strong>Item</strong></td>
                      <td className="text-center"><strong>Price</strong></td>
                      <td className="text-center"><strong>Quantity</strong></td>
                      <td className="text-right"><strong>Totals</strong></td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>{namaproduk}</td>
                      <td className="text-center">Rp. {hargaproduk}</td>
                      <td className="text-center">{qty}</td>
                      <td className="text-right">Rp. {subtotal}</td>
                  </tr>
                  <tr>
                      <td className="thick-line" />
                      <td className="thick-line" />
                      <td className="thick-line text-center"><strong>Subtotal</strong></td>
                      <td className="thick-line text-right">Rp. {subtotal}</td>
                  </tr>
                  <tr>
                      <td className="no-line" />
                      <td className="no-line" />
                      <td className="no-line text-center"><strong>Shipping</strong></td>
                      <td className="no-line text-right">Rp. {this.state.ship}</td>
                  </tr>
                  <tr>
                      <td className="no-line" />
                      <td className="no-line" />
                      <td className="no-line text-center"><strong>Total</strong></td>
                      <td className="no-line text-right">Rp. {total}</td>
                  </tr>
                  </tbody>
              </table>
              </div>
          </div>
          </div>
          <button className="pull-left">Cancel Order</button>
          <button className="pull-right">Confirm Payment</button>
      </div>
      </div>
    })

    return (
      <div className="container">
        {invoice}
        {barang}
      </div>    
    );
  }
}

export default Homepage;

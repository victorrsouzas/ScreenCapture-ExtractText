import * as React from "react";
import "./styles.css";


class Invoice extends React.Component {
  render() {
    return (
      <>        
        <div className="invoice-box">
          <table cellPadding={0} cellSpacing={0}>
            <tr className="top">
              <td colSpan={2}>
                <table>
                  <tr>
                    <td className="title">
                    </td>
                    <td>
                      Factura #: 123
                      <br />
                      Creado: Enero 1, 2020
                      <br />
                      Vencimiento: Enero 1, 2020
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="information">
              <td colSpan={2}>
                <table>
                  <tr>
                    <td>
                      Vi
                      <br />
                      12345 Rogelio Benitez
                      <br />
                      Ciudad del Este, Alto Parana 12345
                    </td>

                    <td>
                      Acme Corp.
                      <br />
                      John Doe
                      <br />
                      john@example.com
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="heading">
              <td>Metodo de pago</td>

              <td>Check #</td>
            </tr>

            <tr className="details">
              <td>Check</td>

              <td>1000</td>
            </tr>

            <tr className="heading">
              <td>Item</td>

              <td>Price</td>
            </tr>

            <tr className="item">
              <td>Website design</td>

              <td>$300.00</td>
            </tr>

            <tr className="item">
              <td>Hosting (3 months)</td>

              <td>$75.00</td>
            </tr>

            <tr className="item last">
              <td>Domain name (1 year)</td>

              <td>$10.00</td>
            </tr>

            <tr className="total">
              <td />

              <td>Total: $385.00</td>
            </tr>
          </table>
        </div>
      </>

    );
  }
}

export default Invoice;
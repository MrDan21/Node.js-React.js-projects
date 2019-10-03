import React, {useEffect, useState, Fragment} from 'react';
import axiosClient from '../../config/axios';
import InvoiceDetails from '../../components/invoices/InvoiceDetails';

function Index() {

    const [invoices, saveInvoice] = useState([]);

    useEffect(() => {
        const getInvoices = async () => {
            const invoiceQuery = await axiosClient.get('/invoices');
            saveInvoice(invoiceQuery.data);
        }
        getInvoices();
    }, []);

    return (
        <Fragment>
            <h2>Pedidos</h2>
            <ul className="listado-pedidos">
                {invoices.map(invoice => (
                    <InvoiceDetails 
                        key={invoice._id}
                        invoice={invoice} 
                    />
                ))}
            </ul>
        </Fragment>
    )
}

export default Index;
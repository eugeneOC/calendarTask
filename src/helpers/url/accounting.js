//====================
// ACCOUNTING ROUTES
//====================

/**
 * Quotation Pages
 */
export const quoteListPage = "/app/acct/quotations";
export const singleQuote = id => `${quoteListPage}/${id}`;
export const quoteNewPage = quoteListPage + "/new";
export const quoteEditPage = id => `${quoteListPage}/${id}/edit`;
export const quoteImportPage = quoteListPage + "/import";

/**
 * Invoice Pages
 */
export const invoiceListPage = "/app/acct/invoices";
export const singleInvoice = id => `${invoiceListPage}/${id}`;
export const invoiceNewPage = invoiceListPage + "/new";
export const invoiceEditPage = id => `${invoiceListPage}/${id}/edit`;
export const invoiceImportPage = invoiceListPage + "/import";
/**
 * Credit Note Pages
 */
export const crednoteListPage = "/app/acct/credit_notes";
export const singleCredNote = id => `${crednoteListPage}/${id}`;
export const crednoteNewPage = crednoteListPage + "/new";
export const crednoteEditPage = crednoteListPage + "/edit";
export const crednoteImportPage = crednoteListPage + "/import";
/**
 * Payment Pages
 */
export const paymentPage = "/app/acct/payments";
export const singlePayment = id => `${paymentPage}/${id}`;
export const newPayment = paymentPage + "/new";
export const editPayment = paymentPage + "/edit";
export const importPayment = paymentPage + "/import";

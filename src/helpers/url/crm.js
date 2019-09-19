//====================
// CRM ROUTES
//====================

/**
 * Lead Pages
 */
export const leadListPage = "/app/crm/leads";
export const singleLead = id => `${leadListPage}/${id}`;
export const leadNewPage = leadListPage + "/new";
export const leadEditPage = id => `${leadListPage}/${id}/edit`;
export const leadImportPage = leadListPage + "/import";

/**
 * Customer Pages
 */
export const customerListPage = "/app/crm/customers";
export const singleCustomer = id => `${customerListPage}/${id}`;
export const customerNewPage = customerListPage + "/new";
export const customerEditPage = id => `${customerListPage}/${id}/edit`;
export const customerImportPage = customerListPage + "/import";

/**
 * Account Pages
 */
export const accountListPage = "/app/crm/accounts";
export const singleAccount = id => `${accountListPage}/${id}`;
export const accountNewPage = accountListPage + "/new";
export const accountEditPage = id => `${accountListPage}/${id}/edit`;
export const accountImportPage = accountListPage + "/import";

/**
 * Deal Pages
 */
export const dealListPage = "/app/crm/deals";
export const singleDeal = id => `${dealListPage}/${id}`;
export const dealNewPage = dealListPage + "/new";
export const dealEditPage = id => `${dealListPage}/${id}/edit`;
export const dealImportPage = dealListPage + "/import";

/**
 * Team Pages
 */
export const teamListPage = "/app/crm/teams";

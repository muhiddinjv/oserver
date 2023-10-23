exports.errors = {
    "500": "Generic internal server error. Try again later.",
    "400": "General client error. The request was not understood by the server, generally due to bad syntax.",
    "400 INCORRECT_VALUE_TYPE": "The JSON value type for the field is incorrect. For example, a string instead of an integer.",
    "400 MISSING_REQUIRED_PARAMETER": "A required path, query, or body parameter is missing.",
    "400 INVALID_VALUE": "A parameter's value is incorrect.",
    "400 INVALID_RANGE": "Specified time range is incorrect. For example, the end time is before the start time.",
    "400 INVALID_CURSOR": "The pagination cursor is incorrect.",
    "400 CONFLICTING_PARAMETERS": "1 or more of the request parameters conflict with each other.",
    "401": "An authentication error. Request had a missing, malformed, or invalid authorization data.",
    "402": "The subscription of the account has lapsed.",
    "403": "The resource requested is not available with your permissions.",
    "404": "The resource was not found.",
    "415": "The server doesn't accept the submitted content-type.",
    "429": "The request was not accepted because the application has exceeded the rate limit."
};

exports.permits = [
    "CUSTOMERS_READ", // Read customer information
    "CUSTOMERS_WRITE", // Edit customer information
    "EMPLOYEES_READ", // Read employee information
    "ITEMS_READ", // Read items, categories, discounts and modifiers
    "INVENTORY_READ", // Read inventory
    "INVENTORY_WRITE",// Edit inventory
    "ITEMS_WRITE",// Edit items, discounts, categories and modifiers
    "MERCHANT_READ", // Read merchant information
    "PAYMENT_TYPES_READ", // Read payment types
    "POS_DEVICES_READ", // Read POS devices information
    "POS_DEVICES_WRITE", // Update POS devices information
    "RECEIPTS_READ", // Read receipts
    "RECEIPTS_WRITE", // Create receipts
    "SHIFTS_READ", // Read shifts
    "STORES_READ", // Read store information
    "SUPPLIERS_READ", // Read supplier information
    "SUPPLIERS_WRITE", // Edit supplier information
];

exports.pos_permits = [
    "Accept payments",
    "Apply discounts with restricted access",
    "Change taxes in a sale",
    "Manage all open tickets",
    "Void saved items in open tickets",
    "Open cash drawer without making a sale",
    "View all receipts",
    "Perform refunds",
    "Reprint and resend receipts",
    "Manage items",
    "View cost of items",
    "Change settings",
    "Access to live chat support"
];

exports.web_permits = [
    "View sales reports",
    "Cancel receipts",
    "Manage items",
    "View cost of items",
    "Manage employees",
    "Manage customers",
    "Edit general settings",
    "Manage billing",
    "Manage payment types",
    "Manage loyalty program",
    "Manage taxes",
    "Manage POS devices",
    "This permission also allows to sign into POS using email and password",
    "Access to live chat support"
];
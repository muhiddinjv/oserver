## Epic: POS & Inventory Management System

### User Story 1:
As a super admin, I want to have a centralized platform to manage wholesalers, retailers, and their direct customers, so that I can efficiently oversee the entire system.

#### Acceptance Criteria:
1. The super admin should have access to an admin dashboard with role-based authentication.
2. The dashboard should allow the super admin to manage user accounts, including wholesalers, retailers, and customers.
3. The super admin should be able to view and update user details, such as contact information and access privileges.
4. The dashboard should provide analytics and reporting features to track sales, inventory, and user activities.

#### Tasks:
1. Design and develop an admin dashboard with role-based authentication.
2. Implement user management functionalities, including account creation, update, and access control.
3. Integrate analytics and reporting features to provide insights on sales, inventory, and user activities.
4. Test and validate the admin dashboard to ensure its functionality and usability.

### User Story 2:
As a wholesaler, I want a system that allows me to send items bought by retailers to their respective stores, ensuring accurate inventory management.

#### Acceptance Criteria:
1. The system should provide a user-friendly interface for the wholesaler to initiate item transfers to retailers.
2. The wholesaler should be able to select specific items, quantities, and retailers for each transfer.
3. Upon successful transfer, the system should update the inventory for both the wholesaler and the retailer.
4. The retailer should receive a notification to confirm the incoming items and add them to their online store.
5. If duplicate items exist, the system should increase the quantity instead of creating duplicates.

#### Tasks:
1. Design and develop a user-friendly interface for the wholesaler to initiate item transfers.
2. Implement inventory management logic to update stock levels for both the wholesaler and the retailer.
3. Create a notification system to inform retailers about incoming items and enable them to confirm and add items to their online store.
4. Test the item transfer functionality to ensure accurate inventory management.

### User Story 3:
As a retailer, I want to have an inventory management system that allows me to perform CRUD operations on items and add regular customers to my online store.

#### Acceptance Criteria:
1. The retailer should have a user-friendly interface to manage their item inventory.
2. The interface should allow CRUD operations, enabling the retailer to add, update, and delete items.
3. The retailer should be able to set their own prices for items.
4. The system should provide a customer management feature, allowing the retailer to add regular customers to their online store.
5. Customers should be able to make orders from the online store.

#### Tasks:
1. Design and develop a user-friendly interface for retailers to manage their item inventory.
2. Implement CRUD operations for item management, including add, update, and delete functionalities.
3. Enable retailers to set their own prices for items.
4. Create a customer management feature for retailers to add regular customers to their online store.
5. Develop order management functionalities for customers to make orders from the online store.

### User Story 4:
As a customer, I want to have a mobile app that allows me to make orders from retailers' online stores and pick up the items later.

#### Acceptance Criteria:
1. The mobile app should have a user-friendly interface for customers to browse and order items.
2. Customers should be able to authenticate using their username and phone number.
3. The app should provide a list of stores available in the customer's region.
4. Customers should be able to scan a QR code in-store to download the client mobile app and find the necessary store.
5. The app should display all available items with their costs and relevant details for informed purchases.

#### Tasks:
1. Design and develop a mobile app using React Native, TypeScript, Redux, and Tailwind CSS.
2. Implement user authentication using username and phone number.
3. Integrate location-based services to provide a list of stores available in the customer's region.
4. Develop QR code scanning functionality to download the client mobile app and find the necessary store.
5. Display items with relevant details and enable customers to make orders.

These user stories, acceptance criteria, and tasks cover the main features of the point of sale and inventory management system. Please note that these are high-level examples, and we need to adapt and refine them based on our specific requirements and business processes.

### Conventional Commits Cheat Sheet

| Type     | Description                                           |
| -------- | ----------------------------------------------------- |
| feat     | A new feature                                         |
| fix      | A bug fix                                             |
| docs     | Documentation only changes                            |
| style    | Changes that do not affect the meaning of the code    |
| refactor | A code change that neither fixes a bug nor adds a feature |
| perf     | A code change that improves performance              |
| test     | Adding missing tests or correcting existing tests      |
| build    | Changes that affect the build system or external dependencies |
| ci       | Changes to our CI configuration files and scripts     |
| chore    | Other changes that don't modify src or test files      |
| revert   | Reverts a previous commit                             |

access token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTliZGNhNmM1OTI0NDc0MTgwN2EyYTciLCJwaG9uZV9udW1iZXIiOiIrOTk4OTkzNDU2Nzg5IiwiaWF0IjoxNzA0NzE0ODc2LCJleHAiOjE3MDQ3MTU3NzZ9.yLgTOGfgR6C46nTiT3NVfClcm7kD4iwmlQVvmaxtXd0
User
    One to Many With address - A user can have a multiple addresses.
    Many to Many with Coupon - Users can use multiple coupons, and a coupon can be used by multiple users.
    One to One with cart - Each user has one cart
        One to Many with Order - A user can have multiple orders.
    One to Many with Review - A user can leave a multiple reviews.
    One to Many with Transaction - A use r can have a multiple Transaction
    One to One With Wishlist - Each user has one wishlist

Address
    Many to one with user - An address belongs to one user
    Many to one with order - An order has one shippinh address

Cart
    One to One with user: each user has one cart
    One to Many with Cart Item: A cart can contain multiple cart items.

CartItem
    Many to One with Cart: A Cart item belongs to one cart.
    Many to One with Product: A cart item refers to one product.

Product
    Many to One with Category: A product belong to one category
    Many to One with Seller: A product is sold by one seller
    One to Many with Review: A product can have multiple reviews.

Category
    Many to one with Category: A category can have a parent category(or a sub categories)

Coupon
    Many to many with User: A coupon can be used by multiple user

Order
    Many to One with User: An order belong to one user.
    One to Many with OrderItem: an order can have multiple order item.
    Many to one with Address: an order has one shipping address.

OrderItem
    Many to one with Order: An order item belongs to one order.
    Many to one with Product: An order has one shipping address

PaymentOrder
    Many to One with User: A payment oder belongs to one user
    One to Many with Order: A payment order can include multiple orders.

Seller
    One to One with Address: A seller has one pickup address.
    One to Many with Product: A seller can sell multiple products.
    One to Many with Transaction: a seller can be involved in multiple transaction

Transaction
    Many to one with User: A transaction is associated with one user.
    Many to one with Seller: A transaction associated with one seller.
    One to One with User: A transaction corresponds to one order.

Review
    Many to One with Product: A review is for one product
    Many to One with User: A review is written by one user.

Wishlist
    One to One with product: Each user has one wishlist
    Many to Many with Product: A wishlist can contain multiple products.

VerificationCode
    One to One with User: A verification code can be associated with one user.
    One to One with Seller: A verification code can be asscociated with one seller.

SellerReport
    One to one with Seller: A report corresponds to one seller.

Steps 
1. Build a connection in database
2. Create a Entity
    - Cover all relational entity
3. Creation of handler
    - Create a interface for services Ex. OrderService
        - interface that you need to implement on your impl services
    - Create a Services               Ex. OrderServiceImpl
        - Logic based on the inteface of orderService
    - Create a Repository
        - you can also customize the query here
    - Create a Controller or a handler API
    - Test the API on the Postman

Stripe Integration
1. Add this maven dependency under maven or gradle etc.
- https://mvnrepository.com/artifact/com.razorpay/razorpay-java
implementation("com.razorpay:razorpay-java:1.4.7")
2. Add also this
https://mvnrepository.com/artifact/com.stripe/stripe-java
implementation("com.stripe:stripe-java:29.2.0")
3. Implement
eCommerceJava-React\ecommerce\src\main\java\com\bernz\service\PaymentService.java
User
    One to Many With address - A user can have a multiple addresses.
    Many to Many with Coupon - Users can use multiple coupons, and a coupon can be used by multiple users.
    One to Many with card - Each user has one cart
    One to Many with order - A user can have multiple orders.
    One to Many with Review - A user can leave a multiple reviews.
    One to Many with Transaction - A use r can have a multiple Transaction
    One to Many With Wishlist - Each user has one wishlist

Address
    Many to one with user - An address belongs to one user
    Many to one with order - An order has one shippinh address

Cart
    One to One with user: each user has one cart
    One to Many with Cart Item: A cart can contain multiple cart items.

CartItem
    Many to One with Cart: A Cart item belongs to one cart.
    Many to One with Product: A cart item refers to one product.

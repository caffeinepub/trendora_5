import Map "mo:core/Map";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Float "mo:core/Float";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  type ProductCategory = {
    #women;
    #men;
    #accessories;
  };

  type Product = {
    id : Nat;
    name : Text;
    category : ProductCategory;
    price : Float;
    rating : Float;
    imageUrl : Text;
    isNew : Bool;
    isSale : Bool;
    salePrice : ?Float;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  let productCatalog = Map.empty<Nat, Product>();

  func initializeProducts() {
    let productsData : [(Nat, Product)] = [
      (1, {
        id = 1;
        name = "Red Dress";
        category = #women;
        price = 99.99;
        rating = 4.5;
        imageUrl = "red_dress.jpg";
        isNew = true;
        isSale = false;
        salePrice = null;
      }),
      (2, {
        id = 2;
        name = "Men's Jacket";
        category = #men;
        price = 149.99;
        rating = 4.2;
        imageUrl = "mens_jacket.jpg";
        isNew = false;
        isSale = true;
        salePrice = ?129.99;
      }),
      (3, {
        id = 3;
        name = "Handbag";
        category = #accessories;
        price = 79.99;
        rating = 4.8;
        imageUrl = "handbag.jpg";
        isNew = true;
        isSale = true;
        salePrice = ?69.99;
      }),
      (4, {
        id = 4;
        name = "Women's Sneakers";
        category = #women;
        price = 59.99;
        rating = 4.3;
        imageUrl = "sneakers.jpg";
        isNew = false;
        isSale = false;
        salePrice = null;
      }),
      (5, {
        id = 5;
        name = "Men's T-Shirt";
        category = #men;
        price = 29.99;
        rating = 4.0;
        imageUrl = "tshirt.jpg";
        isNew = true;
        isSale = false;
        salePrice = null;
      }),
      (6, {
        id = 6;
        name = "Sunglasses";
        category = #accessories;
        price = 39.99;
        rating = 4.7;
        imageUrl = "sunglasses.jpg";
        isNew = false;
        isSale = true;
        salePrice = ?34.99;
      }),
      (7, {
        id = 7;
        name = "Women's Blouse";
        category = #women;
        price = 49.99;
        rating = 4.1;
        imageUrl = "blouse.jpg";
        isNew = true;
        isSale = false;
        salePrice = null;
      }),
      (8, {
        id = 8;
        name = "Men's Jeans";
        category = #men;
        price = 89.99;
        rating = 4.4;
        imageUrl = "jeans.jpg";
        isNew = false;
        isSale = false;
        salePrice = null;
      }),
      (9, {
        id = 9;
        name = "Belt";
        category = #accessories;
        price = 19.99;
        rating = 4.6;
        imageUrl = "belt.jpg";
        isNew = true;
        isSale = true;
        salePrice = ?17.99;
      }),
      (10, {
        id = 10;
        name = "Women's Skirt";
        category = #women;
        price = 69.99;
        rating = 4.9;
        imageUrl = "skirt.jpg";
        isNew = false;
        isSale = false;
        salePrice = null;
      }),
      (11, {
        id = 11;
        name = "Men's Shoes";
        category = #men;
        price = 119.99;
        rating = 4.3;
        imageUrl = "shoes.jpg";
        isNew = true;
        isSale = false;
        salePrice = null;
      }),
      (12, {
        id = 12;
        name = "Scarf";
        category = #accessories;
        price = 24.99;
        rating = 4.5;
        imageUrl = "scarf.jpg";
        isNew = false;
        isSale = true;
        salePrice = ?22.99;
      }),
    ];

    for ((productId, productData) in productsData.values()) {
      productCatalog.add(productId, productData);
    };
  };

  initializeProducts();

  let carts = Map.empty<Principal, Map.Map<Nat, Nat>>();
  let wishlists = Map.empty<Principal, Set.Set<Nat>>();

  // Cart functions
  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (quantity == 0) { Runtime.trap("Quantity must be at least 1") };
    if (not productCatalog.containsKey(productId)) { Runtime.trap("Product does not exist") };

    let userCart = switch (carts.get(caller)) {
      case (null) { Map.empty<Nat, Nat>() };
      case (?cart) { cart };
    };

    let currentQuantity = switch (userCart.get(productId)) {
      case (null) { 0 };
      case (?qty) { qty };
    };
    userCart.add(productId, currentQuantity + quantity);
    carts.add(caller, userCart);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) {
        cart.remove(productId);
        carts.add(caller, cart);
      };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    carts.remove(caller);
  };

  public query ({ caller }) func getCart() : async [(Product, Nat)] {
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) {
        cart.entries().map(func((productId, quantity)) { (switch (productCatalog.get(productId)) {
                                                              case (null) { Runtime.trap("Product does not exist") };
                                                              case (?product) { product };
                                                            }, quantity) }).toArray();
      };
    };
  };

  // Wishlist functions
  public shared ({ caller }) func toggleWishlist(productId : Nat) : async Bool {
    if (not productCatalog.containsKey(productId)) { Runtime.trap("Product does not exist") };

    let userWishlist = switch (wishlists.get(caller)) {
      case (null) { Set.empty<Nat>() };
      case (?wishlist) { wishlist };
    };

    let isProductInWishlist = userWishlist.contains(productId);

    switch (isProductInWishlist) {
      case (true) {
        userWishlist.remove(productId);
      };
      case (false) {
        userWishlist.add(productId);
      };
    };

    wishlists.add(caller, userWishlist);

    not isProductInWishlist;
  };

  public query ({ caller }) func getWishlist() : async [Product] {
    switch (wishlists.get(caller)) {
      case (null) { [] };
      case (?wishlist) {
        wishlist.values().map(func(productId) { switch (productCatalog.get(productId)) {
                                                  case (null) { Runtime.trap("Product does not exist") };
                                                  case (?product) { product };
                                                } }).toArray();
      };
    };
  };

  // Product catalog functions
  public query ({ caller }) func getAllProducts() : async [Product] {
    productCatalog.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : ProductCategory) : async [Product] {
    productCatalog.values().filter(func(product) { product.category == category }).toArray().sort();
  };
};

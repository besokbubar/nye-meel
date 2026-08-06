const addToCart = (product) => {
    if (setItems) {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            buyPrice: product.buyPrice || 0,
            discount: product.discount || 0, // Simpan diskon produk ke item keranjang
            qty: 1,
          },
        ];
      });
    }

    triggerToast(`🛒 ${product.name} ditambah ke keranjang!`);
  };

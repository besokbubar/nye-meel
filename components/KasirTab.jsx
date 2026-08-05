{/* Modal Pembayaran */}
      {showPayment && (
        <PaymentModal
          total={total}
          onClose={() => setShowPayment(false)}
          onSuccess={(paymentData) => {
            // Oper data hitungan dari PaymentModal ke Struk
            setCompletedTransaction({
              items,
              total,
              discount: paymentData.discount,
              finalTotal: paymentData.finalTotal,
              payAmount: paymentData.payAmount,
              isDebt: paymentData.isDebt,
              debtAmount: paymentData.debtAmount,
              changeAmount: paymentData.changeAmount,
            });
            setShowPayment(false);
            setShowReceipt(true);
            setItems([]); // Kosongkan keranjang setelah transaksi sukses
          }}
        />
      )}

      {/* Modal Struk */}
      {showReceipt && completedTransaction && (
        <ReceiptModal
          transaction={completedTransaction}
          onClose={() => setShowReceipt(false)}
        />
      )}

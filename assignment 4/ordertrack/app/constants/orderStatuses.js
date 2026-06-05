export const ORDER_STATUSES = {
  PLACED:     { label: 'Order Placed',      color: '#6366f1', icon: '📦' },
  CONFIRMED:  { label: 'Confirmed',         color: '#3b82f6', icon: '✅' },
  PREPARING:  { label: 'Preparing',         color: '#f59e0b', icon: '🍳' },
  DISPATCHED: { label: 'Dispatched',        color: '#8b5cf6', icon: '🚚' },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery', color: '#ec4899', icon: '🛵' },
  DELIVERED:  { label: 'Delivered',         color: '#10b981', icon: '🎉' },
  CANCELLED:  { label: 'Cancelled',         color: '#ef4444', icon: '❌' },
};

export const STATUS_ORDER = [
  'PLACED', 'CONFIRMED', 'PREPARING', 'DISPATCHED', 'OUT_FOR_DELIVERY', 'DELIVERED',
];

// Human-readable notification messages for each status transition
export const STATUS_MESSAGES = {
  CONFIRMED:        'Your order has been confirmed by the restaurant!',
  PREPARING:        'The kitchen is now preparing your order 🍳',
  DISPATCHED:       'Your order has been picked up by a delivery agent 🚚',
  OUT_FOR_DELIVERY: 'Almost there! Your order is out for delivery 🛵',
  DELIVERED:        'Your order has been delivered. Enjoy your meal! 🎉',
  CANCELLED:        'Unfortunately, your order has been cancelled.',
};

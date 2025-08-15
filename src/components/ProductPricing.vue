<template>
  <div class="product-pricing">
    <div class="pricing-header">
      <div class="price-main">
        <span class="price-current">${{ currentPrice }}</span>
        <span class="price-unit" v-if="priceUnit">/{{ priceUnit }}</span>
      </div>
      <div class="stock-info">
        <span class="stock-status" :class="stockStatusClass">
          <i :class="stockIcon"></i>
          {{ stockText }}
        </span>
        <span class="stock-quantity" v-if="showQuantity">
          {{ stockQuantity }} {{ stockUnit }} disponibles
        </span>
      </div>
    </div>
    
    <div class="pricing-secondary" v-if="originalPrice && originalPrice !== currentPrice">
      <span class="price-original">${{ originalPrice }}</span>
      <span class="discount-badge">-{{ discountPercentage }}%</span>
    </div>
    
    <div class="features-list" v-if="features && features.length">
      <span class="feature-item" v-for="feature in features" :key="feature">
        {{ feature }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductPricing',
  props: {
    currentPrice: {
      type: [Number, String],
      required: true
    },
    originalPrice: {
      type: [Number, String],
      default: null
    },
    priceUnit: {
      type: String,
      default: null
    },
    stockQuantity: {
      type: Number,
      required: true
    },
    stockUnit: {
      type: String,
      default: 'unidades'
    },
    showQuantity: {
      type: Boolean,
      default: true
    },
    features: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    discountPercentage() {
      if (!this.originalPrice || this.originalPrice === this.currentPrice) return 0
      return Math.round(((this.originalPrice - this.currentPrice) / this.originalPrice) * 100)
    },
    stockStatusClass() {
      if (this.stockQuantity > 10) return 'in-stock'
      if (this.stockQuantity > 0) return 'low-stock'
      return 'out-of-stock'
    },
    stockIcon() {
      if (this.stockQuantity > 10) return 'fa fa-check-circle'
      if (this.stockQuantity > 0) return 'fa fa-exclamation-triangle'
      return 'fa fa-times-circle'
    },
    stockText() {
      if (this.stockQuantity > 10) return 'En stock'
      if (this.stockQuantity > 0) return 'Pocas unidades'
      return 'Agotado'
    }
  }
}
</script>

<style scoped>
.product-pricing {
  font-family: 'Montserrat', serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border: 2px solid var(--primary-color);
  border-radius: 15px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.pricing-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.price-current {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
}

.price-unit {
  font-size: 1.5rem;
  color: var(--text-secondary, #666);
  font-weight: 400;
}

.stock-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.stock-status {
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stock-status.in-stock {
  color: #27ae60;
}

.stock-status.low-stock {
  color: #f39c12;
}

.stock-status.out-of-stock {
  color: #e74c3c;
}

.stock-quantity {
  font-size: 1.3rem;
  color: var(--text-secondary, #666);
  margin-top: 0.25rem;
}

.pricing-secondary {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.price-original {
  color: #999;
  text-decoration: line-through;
  font-size: 1.3rem;
}

.discount-badge {
  background: #e74c3c;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.feature-item {
  background: var(--primary-color);
  color: white;
  padding: 0.3rem 0.75rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .pricing-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .stock-info {
    align-items: flex-start;
    text-align: left;
  }
  
  .price-current {
    font-size: 2.5rem;
  }
  
  .price-unit {
    font-size: 1.3rem;
  }
  
  .stock-status {
    font-size: 1.5rem;
  }
  
  .feature-item {
    font-size: 1rem;
    padding: 0.25rem 0.6rem;
  }
}

@media (max-width: 480px) {
  .product-pricing {
    padding: 1rem;
  }
  
  .price-current {
    font-size: 2rem;
  }
  
  .price-unit {
    font-size: 1rem;
  }
}
</style>

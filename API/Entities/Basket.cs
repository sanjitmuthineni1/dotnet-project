using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();
        public void AddItem(Product product, int amount) {
            if (Items.All(item => item.ProductId != product.Id)) {
                Items.Add(new BasketItem{Product = product, Amount = amount});
            }
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Amount += amount;
        }


        public void RemoveItem(int productId, int amount) {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
            item.Amount -= amount;
            if (item.Amount == 0) Items.Remove(item);
        }

    }
}
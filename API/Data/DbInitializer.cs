using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager) {

            if(!userManager.Users.Any()) {
                
                var user = new User {
                    UserName = "bob",
                    Email = "bob@test.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] {"Member", "Admin"});

            }

            if (context.Products.Any()) return;

            var products = new List<Product> {

                new Product
                {
                    Name = "Paradym Ai Smoke",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1100,
                    ImageUrl = "https://todaysgolfer-images.bauersecure.com/wp-images/152969/870x580/001-callaway-paradym-ai-smoke-iron.jpg",
                    Brand = "Callaway",
                    Type = "Irons",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "Qi",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 1100,
                    ImageUrl = "https://www.golfalot.com/Portals/0/imagesblogs/taylormade/qiirons/hero.jpg",
                    Brand = "TaylorMade",
                    Type = "Irons",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "G430",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 1200,
                    ImageUrl = "https://www.golfalot.com/Portals/0/imagesblogs/ping/g430irons/hero.jpg",
                    Brand = "Ping",
                    Type = "Irons",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "T350",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 1400,
                    ImageUrl = "https://golfweek.usatoday.com/wp-content/uploads/sites/87/2023/08/IMG_6630.jpg?w=1000&h=600&crop=1",
                    Brand = "Titleist",
                    Type = "Irons",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "Stealth",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 750,
                    ImageUrl = "https://uploads.mygolfspy.com/uploads/2023/06/Stealth-Black-Irons-Lifestyle-11.jpg",
                    Brand = "TaylorMade",
                    Type = "Irons",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "MAVRIK",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 650,
                    ImageUrl = "https://www.golfalot.com/Portals/0/imagesblogs/callaway/mavrik/irons/review/mavrik_hero.jpg",
                    Brand = "Callaway",
                    Type = "Irons",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "Qi10",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 600,
                    ImageUrl = "https://todaysgolfer-images.bauersecure.com/wp-images/156236/870x580/00-taylormade-qi10-driver.jpg",
                    Brand = "TaylorMade",
                    Type = "Driver",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "Darkspeed Max",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 550,
                    ImageUrl = "https://cdn.mos.cms.futurecdn.net/AZe2GrEzSRuS7cVjvFnbp5.jpg",
                    Brand = "Cobra",
                    Type = "Driver",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "Darkspeed X",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 600,
                    ImageUrl = "https://www.golfalot.com/Portals/0/imagesblogs/cobra/darkspeedxdriver/hero.jpg",
                    Brand = "Cobra",
                    Type = "Driver",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "Qi Max",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1800,
                    ImageUrl = "https://www.golfalot.com/Portals/0/imagesblogs/taylormade/qi10maxdriver/hero.jpg",
                    Brand = "TaylorMade",
                    Type = "Driver",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "G430 Max 10K",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 600,
                    ImageUrl = "https://golf.com/wp-content/uploads/2023/11/champp-1-1024x576.jpg",
                    Brand = "Ping",
                    Type = "Driver",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "Paradym Ai Smoke MAX",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1600,
                    ImageUrl = "https://www.golfalot.com/Portals/0/imagesblogs/callaway/aismokemax/max_hero.jpg",
                    Brand = "Callaway",
                    Type = "Driver",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "Spider X",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 250,
                    ImageUrl = "https://m.media-amazon.com/images/I/61eiaBhUuJL._AC_UF1000,1000_QL80_.jpg",
                    Brand = "TaylorMade",
                    Type = "Putter",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "Odyssey Tri-Hot 5K",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 200,
                    ImageUrl = "https://www.golfavenue.com/media/catalog/product/t/r/tri-hot-5k-triple-wide-44166-1-13486_1.jpg",
                    Brand = "Callaway",
                    Type = "Putter",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "Truss TM1",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 180,
                    ImageUrl = "https://i1.adis.ws/i/golftown/40113699_1/Truss-TM1-Putter?$default$&w=637&h=637",
                    Brand = "TaylorMade",
                    Type = "Putter",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "King Nova",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 140,
                    ImageUrl = "https://www.cobragolf.com/cdn/shop/products/a4b6313124f6f933cbdafa622e9423dfd6375d47_1445x.jpg?v=1702043534",
                    Brand = "Cobra",
                    Type = "Putter",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "Odyssey White Hot OG",
                    Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                    Price = 210,
                    ImageUrl = "https://www.customclubs.se/images/zoom/whitehotog1putter3-25205.jpg",
                    Brand = "Callaway",
                    Type = "Putter",
                    AmountInStock = 100
                },
                new Product
                {
                    Name = "Scotty Cameron Newport",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 450,
                    ImageUrl = "https://acushnet.scene7.com/is/image/titleist/23-SuperSelect-Newport-PDP-5050?wid=1200&qlt=75&resMode=sharp2",
                    Brand = "Titleist",
                    Type = "Putter",
                    AmountInStock = 100
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}
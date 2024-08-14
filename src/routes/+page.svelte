<script>
    import Navbar from "$lib/components/navbar/Navbar.svelte";
    import Facebook from "$lib/components/Facebook/Facebook.svelte"
    import Instagram from "$lib/components/Instagram/Instagram.svelte"
</script>
<html class="dark" lang="en">
    <Navbar />  

    <section class="bg-gray-400 dark:bg-gray-900 text-gray-700 dark:text-gray-200 py-20">
        <div class="container mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-4 dark:text-white text-gray-900">Manage Your Finances Effortlessly</h1>
          <p class="text-xl md:text-2xl mb-8 dark:text-gray-400 text-gray-700">Take control of your financial future with our easy-to-use app.</p>
          <a href="#signup" class="bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-200 px-8 py-4 rounded-full font-bold hover:bg-gray-200 dark:hover:bg-gray-600">Get Started</a>
        </div>
      </section>
      
      <!-- Features Section -->
      <section class="py-20 bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto">
          <h2 class="text-3xl font-bold text-center mb-10 dark:text-white text-gray-900">Features</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <h3 class="text-xl font-bold mb-2 dark:text-gray-200 text-gray-900">Track Expenses</h3>
              <p class="dark:text-gray-400 text-gray-700">Monitor your spending and keep track of where your money goes.</p>
            </div>
            <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <h3 class="text-xl font-bold mb-2 dark:text-gray-200 text-gray-900">Set Budgets</h3>
              <p class="dark:text-gray-400 text-gray-700">Create budgets to manage your finances better.</p>
            </div>
            <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <h3 class="text-xl font-bold mb-2 dark:text-gray-200 text-gray-900">Financial Insights</h3>
              <p class="dark:text-gray-400 text-gray-700">Get insights and reports to understand your financial habits.</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Testimonials Section -->
      <section class="py-20 bg-gray-400 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
        <div class="container mx-auto">
          <h2 class="text-3xl font-bold text-center mb-10 dark:text-white text-gray-900">What Our Users Say</h2>
          <div class="flex flex-wrap justify-center">
            <div class="w-full md:w-1/3 p-4">
              <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <p class="italic dark:text-gray-200 text-gray-700">"This app changed my life! I can finally manage my money effectively."</p>
                <p class="text-right mt-4 dark:text-gray-400 text-gray-900">- Jacqq Corgi</p>
              </div>
            </div>
            <div class="w-full md:w-1/3 p-4">
              <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <p class="italic dark:text-gray-200 text-gray-700">"Easy to use and very helpful for tracking my expenses."</p>
                <p class="text-right mt-4 dark:text-gray-400 text-gray-900">- Chicken the cat</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Pricing Section -->
      <!-- <section class="py-20 bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto text-center">
          <h2 class="text-3xl font-bold mb-10 dark:text-white text-gray-900">Pricing</h2>
          <div class="flex flex-wrap justify-center">
            <div class="w-full md:w-1/3 p-4">
              <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <h3 class="text-xl font-bold mb-2 dark:text-gray-200 text-gray-900">Free Plan</h3>
                <p class="text-2xl font-bold mb-4 dark:text-gray-400 text-gray-700">$0/month</p>
                <p class="dark:text-gray-400 text-gray-700">Basic features to get you started.</p>
                <a href="#signup" class="block bg-gray-400 dark:bg-gray-900 text-white dark:text-gray-200 px-8 py-4 rounded-full font-bold mt-4 hover:bg-gray-500 dark:hover:bg-gray-800">Sign Up</a>
              </div>
            </div>
            <div class="w-full md:w-1/3 p-4">
              <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <h3 class="text-xl font-bold mb-2 dark:text-gray-200 text-gray-900">Premium Plan</h3>
                <p class="text-2xl font-bold mb-4 dark:text-gray-400 text-gray-700">$9.99/month</p>
                <p class="dark:text-gray-400 text-gray-700">Advanced features for more control.</p>
                <a href="#signup" class="block bg-gray-400 dark:bg-gray-900 text-white dark:text-gray-200 px-8 py-4 rounded-full font-bold mt-4 hover:bg-gray-500 dark:hover:bg-gray-800">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </section>
       -->

      
      <!-- Footer -->
      <footer class="bg-gray-400 dark:bg-gray-900 text-gray-700 dark:text-gray-200 py-10">
        <div class="container mx-auto text-center">
          <p class="dark:text-gray-400 text-gray-700">&copy; 2024 Money Moose, Hans Emilio M. Lumagui. All rights reserved. Icons by Icons8</p>
          <div class="flex justify-center space-x-4 mt-4">
            <a href="/about" class="hover:underline dark:text-gray-400 text-gray-700">About</a>
            <a href="/contact" class="hover:underline dark:text-gray-400 text-gray-700">Contact</a>
            <a href="/privacy" class="hover:underline dark:text-gray-400 text-gray-700">Privacy Policy</a>
          </div>
          <div class="flex justify-center space-x-4 mt-4">
            <Facebook />
            <Instagram />
          </div>
        </div>
      </footer>
</html>
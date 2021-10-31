# nftkey_filter
How to use in Chrome:
* install https://www.tampermonkey.net/
* create new script in Tampermonkey
* paste code from nftkey_filter.js and save
* open an NFTKEY collection with additional GET parameters in the URL:
  * minRank
  * maxRank
  * minPrice
  * maxPrice
  * opacity (default is 0.15, 0.0 or 0 removes the element from the list)

All parameters are optional. Example: https://nftkey.app/collections/binancebullsoc/?minRank=500&maxRank=200

Result:
![image](https://user-images.githubusercontent.com/93408926/139509700-ac6f0eff-f722-409e-b2fe-638685d59dda.png)

const pick = (n) => {
  return Math.floor(Math.random() * n)
}

// for spots

const ownerIds = [1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 11, 11, 12, 12, 13, 14, 14, 13]

const addresses = [
  '111 N Wonder Rd',
  '2343 W Left Ln',
  '300 S West St',
  '875 Main St #200',
  '707 E WhoaThere Dr',
  '1502 Desert Drive Ln',
  '544 Forest Lane Rd',
  '6568 Thicket Dr',
  '2323 W Westward Way',
  '764 N Highway Ln #111'
]

const citystate = [
  { city: 'Phoenix', state: 'AZ' },
  { city: 'San Francisco', state: 'CA' },
  { city: 'Chicago', state: 'IL' },
  { city: 'Seattle', state: 'WA' },
  { city: 'Austin', state: 'TX' },
  { city: 'Boise', state: 'ID' },
  { city: 'Albany', state: 'NY' },
  { city: 'Gallup', state: 'NM' },
  { city: 'Denver', state: 'CO' },
  { city: 'New Orleans', state: 'LA' },
  { city: 'Amherst', state: 'MA' },
  { city: 'Salt Lake City', state: 'UT' },
  { city: 'Lincoln', state: 'NE' },

]


const names = [
  'Sunset Suite',
  'Golden Greens',
  'Happy Trail Estates',
  'Peaceful Point',
  'Cow Country Park',
  'Hills Mills and Rec',
  'Trickling Stream Suite',
  "Wanderer's Wonderworld",
  'The buh N buh Dreamspace',
  'Server Side and Blocks',
  'Creepy Creeper Cottage',
  "Survivor's Lodge",
  "Secret Server Hideaway",
  "Blocks and Spaces Place"
]


const descriptions = [
  'Try and find a better spot, this place is peace',
  'A first stop spot for you to drop your worries, and relax',
  'A wonderful location for your next staycation',
  'Take your dream trip and find yourself. Again!',
  'Breathtaking views and beautiful vibes for your mind to stew (on)',
  "Wondering where life leads next? It's here, right here.",
  "You deserve this level of comfort on your next adventure, all amenities included",
  "Wondering where to head next? This spot has it all. You'll love it!"
]


const prices = [
  225.00,
  149.99,
  100.00,
  424.99,
  60.99,
  175.00,
  89.99,
  332.99,
  200.00
]


// for spot images (urls from s3 bucket already uploaded)

const imageUrls = [
  "https://da-air-buh-n-buh.s3.us-west-2.amazonaws.com/witch-house-by-platinumthief.jpeg",
  "https://da-air-buh-n-buh.s3.us-west-2.amazonaws.com/three-floor-white-container-house-by-mandoomin.jpeg",
  "https://da-air-buh-n-buh.s3.us-west-2.amazonaws.com/survival-starter-house-by-zaypixel.jpeg",
  "https://da-air-buh-n-buh.s3.us-west-2.amazonaws.com/simple-wooden-surival-house-by-sheepgg.jpg",
  "https://da-air-buh-n-buh.s3.us-west-2.amazonaws.com/pagoda-style-house-by-sheepgg.jpeg",
  "https://da-air-buh-n-buh.s3.us-west-2.amazonaws.com/modern-house-with-pool-irie-genie.jpeg",
  "https://da-air-buh-n-buh.s3.us-west-2.amazonaws.com/mangrove-starter-house-by-folli.jpeg",
  "https://da-air-buh-n-buh.s3.us-west-2.amazonaws.com/luxury-modern-house-by-oshacra.jpeg",
  "https://da-air-buh-n-buh.s3.us-west-2.amazonaws.com/large-modern-house-by-irie-genie.jpeg",
  "https://da-air-buh-n-buh.s3.us-west-2.amazonaws.com/large-farmhouse-two-by-zaypixel.jpeg",
  "https://da-air-buh-n-buh.s3.us-west-2.amazonaws.com/jungle-treehouse-by-diddihd.jpeg",
  "https://da-air-buh-n-buh.s3.us-west-2.amazonaws.com/hobbit-hole-by-goldrobbin.jpeg",
  "https://da-air-buh-n-buh.s3.us-west-2.amazonaws.com/fantasy-mansion-by-bigtonymc.jpeg",
]


// for reviews

const reviews = [
  'This was it. This was the one. The one spot that made everything change. All of a sudden, now I have this incredible life experience and its imprint on my being going forward. Forever in my life. Take that as you will.',
  "I can never think of a better saying, and there's GOT to be a better saying -- that's the one! Yep, the saying to fit this reviews rating, indeed! You know what I mean. And so therefor, this review is valid and worth your time of reading. Thank you.",
  "Rating says it all. No words necessary (other than these, there IS a character minimum after all ... !)",
  "Hoping to gain more traveler cred by leaving a review on this one. Not really into travel tho, so we'll see how this all pans out.",
  "Short and sweet: This place was truly an experience. Won't forget it, and whether that's a good / bad thing remains to be seen !!",
  "Our host was so excellent. Everything was so excellent. Just excellent. Can't you tell how excellent it was ? If not, consider visiting yourself! Dang.",
  "Awwwwww come on! You can't tell me you've lived until you've visited THIS spot. Seriously.",
  "Wow, lotta thoughts to be placed here but I just can't think of what right now. Perhaps I'll come back and edit this later to be a more informative and, ultimately, more useful review",
  "Just leaving a lil review here for now :) funtimes",
  "What would you do if you visited this spot? Not sure yet? Well come on, this place changed my LIFE !",
  "Eh, it was definitely okay. Can't say I'll repeat the trip but who knows??"
]

const stars = [1, 2, 3, 4, 5, 5, 3, 4, 3, 2]

// review images

const reviewImageUrls = [
  "https://res.cloudinary.com/dixbzsdnm/image/upload/v1681939948/da-air-buh-n-buh/sample-data/cdzi9spmy5w41_eiv3ea.png",
  "https://res.cloudinary.com/dixbzsdnm/image/upload/v1681939912/da-air-buh-n-buh/sample-data/e2197-16578468621370-1920_jdycfb.jpg",
  "https://res.cloudinary.com/dixbzsdnm/image/upload/v1681939885/da-air-buh-n-buh/sample-data/Image-5_k40ygn.jpg",
  "https://res.cloudinary.com/dixbzsdnm/image/upload/v1681939874/da-air-buh-n-buh/sample-data/Image-10_et247w.jpg",
  "https://res.cloudinary.com/dixbzsdnm/image/upload/v1681939862/da-air-buh-n-buh/sample-data/Image-13-1_qfqbiz.jpg",
  "https://res.cloudinary.com/dixbzsdnm/image/upload/v1681939854/da-air-buh-n-buh/sample-data/Image-9_rdluqs.jpg",
  "https://res.cloudinary.com/dixbzsdnm/image/upload/v1681939846/da-air-buh-n-buh/sample-data/Image-8_cmysj8.jpg",
  "https://res.cloudinary.com/dixbzsdnm/image/upload/v1681939841/da-air-buh-n-buh/sample-data/Image-7_bg1p0u.jpg",
  "https://res.cloudinary.com/dixbzsdnm/image/upload/v1681939834/da-air-buh-n-buh/sample-data/Image-4_mcrugt.jpg",
  "https://res.cloudinary.com/dixbzsdnm/image/upload/v1681939826/da-air-buh-n-buh/sample-data/Image-2_utpkan.jpg",
  "https://res.cloudinary.com/dixbzsdnm/image/upload/v1681939822/da-air-buh-n-buh/sample-data/Image-1-1_mou47y.jpg"
]


module.exports = {
  pick, ownerIds, addresses, citystate, names, descriptions, prices, imageUrls, reviews, stars, reviewImageUrls
}

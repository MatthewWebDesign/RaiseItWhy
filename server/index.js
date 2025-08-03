const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000; // Changed this line

// Middleware
app.use(cors());
app.use(express.json());

// Root route - ADD THIS
app.get('/', (req, res) => {
  res.json({ 
    message: 'Fundraiser API Server is running!',
    endpoints: {
      health: '/health',
      generateWhy: 'POST /api/generate-why'
    }
  });
});

// Root route - ADD THIS
app.get('/', (req, res) => {
  res.json({ 
    message: 'Fundraiser API Server is running!',
    endpoints: {
      health: '/health',
      generateWhy: 'POST /api/generate-why'
    }
  });
});

// Generate Why endpoint
app.post('/api/generate-why', async (req, res) => {
  try {
    const { orgType, orgName, fundraiserType, clientInfo } = req.body;

    if (!orgType || !orgName || !fundraiserType || !clientInfo) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a more detailed prompt for Gemini
    const prompt = `You are writing a formal peice of text, with 2 or 3 segments of text totalling 75-125 words. The peice of text serves as a "Why" statement for a fundraising campaign, telling donors what the organisation (of which you will receive details about) is fundraising for.
    the segments will be seperated by a line. the first segment will state what type of fundraiser it is. if the type is event - talk about how the school is running an event etc, if it is product say they are selling a product to... 
    for the second segment can you talk about what the money is for and how it will benefit the poeple at that organisations (e.g people at school) and for the third "thanks" segment, thank poeple for their generosity while referring to the template lines listed below such as "These 200g Rocky Road bars are perfect to share or gift and are allergy friendly.". 
    Finally, a one liner Thanks for support "name of org" e.g. 'Thank you for supporting St Mary's College Ponsonby' can be added as a tiny bottom liner section. 

Organization Type: ${orgType}
Organization Name: ${orgName}
Fundraiser Type: ${fundraiserType}
Client Information on why the fundraiser is taking place: ${clientInfo}

You will mimick the writing style of the below examples. START OF EXAMPLES:

Who: Te Awamutu Intermediate Netball, Event: Product - Frozen Cookies
Why: We are fundraising to send our netball team to AIMS games

Te Awamutu Intermediate Netball is selling delicious frozen cookie dough to fundraiser for our team's trip to the Zespri AIMS Games 2025 in Tauranga this September.

Funds raised will help cover the costs of our week long stay and give our players the chance to compete, learn, and create unforgettable memories at this fantastic national event. 

This sweet cookie dough is perfect to keep in the freezer for quick, tasty baking and every purchase helps get our team one step closer to the games. 

Thank you for your support!

Who: Greymouth High School, Event: Product-  Pies and Savouries, 
Why: We are fundraising to send our sports teams to tournaments

Greymouth High School is selling delicious frozen pies and savouries from Luv a Pie to raise funds for our sports teams heading to tournaments.

Funds raised will help reduce costs for students, making it easier for them to travel and compete, giving them the chance to represent our school, build skills, and create lasting memories.

These hearty pies and savouries are perfect for family meals or quick snacks and every purchase helps get our teams one step closer to tournament.

Thank you for supporting Greymouth High School!

Who: Northcross Intermediate School, Event: Fun Run, 
Why: We are fundraising in our annual 3km loop fun run for continued enhancement of the school 

The Annual Northcross School Fun Run will be held on Friday 22nd August.

This much-anticipated event brings the entire school community together and provides an opportunity to raise funds for new technology, equipment, and enriching learning experiences that support both our classroom and sports programmes.

Every student will be participating by completing a 3km course, setting their own personal target for the day.

Students will be seeking online sponsorship for their participation, with all funds raised contributing to the continued enhancement of our school and its outstanding learning environment.

Thank you for supporting Northcross Intermediate School.

Who: St Mary's School Caterton, Event: Product - Popcorn, 
Why: Fundraising for outdoor heaters in newly covered quad

St Mary's School Carterton is selling delicious gourmet popcorn to raise funds for outdoor heaters in our newly covered quad.

Now that this great outdoor space can be used year-round, we want to keep it comfortable and warm for our students, making it a welcoming place for learning, play, and gathering even on chilly days.

This tasty popcorn is perfect for lunchboxes, movie nights, or sharing with whanau and every purchase helps create a cosier outdoor space for our tamariki.

Thank you for your support!

END OF EXAMPLES 

Try to mimick the provided examples in style, pacing etc, making sure only to substitute and add on what you feel is necessary to best provide context for the fundraiser. 
Please put <br> after each section.
The last section where you thank the donators should always have <br> before it
For product fundraisers, please make sure to explain what the products are in the last section as done in the exemplars (before thanking donors of course)

The following are sample WHYS that you can use to create a why for the fundraiser you are preparing for build. Please ensure you double check the following: 
 

 

WHAT is the fundraising product (is that consistently correct in all areas of the why) 
 

 

WHO is fundraising? Ie the client might say Orewa College - but it might be Orewa College Water Polo Team that is fundraising, NOT the whole college so make sure the why is correct 
 

 

HOW - funds raised are going to help this team/school/group  
 

 

HAVE - you made sure the fundraiser page is pitched slightly different, ie this is the voice of the fundraiser, so usually takes a 'first person approach' 
 

 

All content for WHYS is recorded in PROCESS STREET in the Create and manage the "why" content task in the product fundraiser work flow - this is also where the why is edited after the website is live. 
 

 

The following are general sentences that can be added to WHYS, depending on the specific fundraising purpose. Please ensure these sentences are incorporated into the why, when the purpose matches that of the example. 
 

AIMS games: 
School camp provides students with valuable opportunities for personal growth, teamwork, and independence. It encourages social interaction, builds confidence, and fosters resilience through outdoor activities and challenges. Camp experiences also strengthen friendships, enhance communication skills, and create lasting memories for students. 
 
AIMS Games:
AIMS Games is a sport event in which almost 13000 competitors representing 390 schools take part in playing one of the 27 sports codes on offer and our students work hard training for this important event. Funds raised will support students in the costs associated with this event helping them to be able to attend and compete.  
 
Overseas trip:
Overseas experiences offer students valuable cultural exposure, broadening their perspectives and fostering global awareness. These experiences enhance language skills, independence, and adaptability. Students develop confidence, empathy, and problem-solving abilities through real-world challenges.  
 
New Playground: 
Well-designed spaces promote physical development, improve coordination, and support mental well-being in students. They inspire imaginative play, strengthen peer relationships, and help children build confidence, resilience, and problem-solving skills in a fun, engaging environment. 

Tournaments: 
Participating in sports tournaments provides valuable benefits for students. It enhances physical health, builds teamwork and discipline, and fosters resilience through competition. Tournaments also teach goal-setting, sportsmanship, and time management. Students gain confidence, develop leadership skills, and form meaningful connections, all while enjoying the excitement and challenge of competitive play. 

Additional resources:
Additional resources for kindergartens and early learning centres greatly enrich the learning environment. Improved play equipment, learning materials, and sensory tools support children’s development through hands-on exploration. These resources stimulate creativity, enhance motor skills, and foster curiosity, creating a fun, engaging, and supportive space for early growth and discovery. 

New Uniforms:
New uniforms foster pride, unity, and confidence. They create a sense of belonging, motivating team members to perform their best. It also boosts self-esteem, promotes discipline, and encourages responsibility, while strengthening team spirit both on and off the field, helping players work together towards shared goals.
END OF TEMPLATE EXPLANATIONS

Please format a why into three aspects. The first section will be your basic statement of intent (we are x fundraising for x). if its a product fundraiser you are required to mention the product exactly as shown below. You are also required to in the last section (thanks section) state how the products will benefit both the club and community. this is also shown below. 
PIES: 
__ are selling delicious pies and savouries from Luv a Pie to support __
By supporting our club fundraiser you are investing in our community.  These pies and savouries are a great addition to the freezer for winter and we really appreciate the assistance it brings our club and our members.
COOKIES:  
__ are selling delicious frozen cookie dough to support __
These frozen cookies are a great addition to the freezer and we really appreciate the assistance it brings.
COOKIES AND CROISSANTS:
__ are selling delicious frozen cookie dough and croissants to help fundraise to support __ 
These frozen cookies and croissants are a great addition to the freezer and we really appreciate the assistance it brings
ROCKY ROAD:
__ are selling delicious Rocky Road to raise funds towards the cost of __
These 200g Rocky Road bars are perfect to share or gift and are allergy friendly. 
END OF EXAMPLES
Please remember to incorporate these sentences EXACTLY where possible, while keeping it in context of the fundraiser. 

`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API Response Status:', response.status);
      console.error('Gemini API Response Text:', errText);
      throw new Error(`Gemini API error: ${response.status} ${errText}`);
    }

    const result = await response.json();
    
    // Extract the generated text from Gemini's response format
    const generatedWhy = result.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate response. Please try again.';

    res.json({ why: generatedWhy.trim() });
  } catch (error) {
    console.error('Error generating why:', error);
    res.status(500).json({ error: error.message || 'Failed to generate why statement' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
# Do this so rudycorona.com shows your new site

Only you can do these steps (they require your Vercel login). Follow them in order.

---

## Step 1: Open Vercel

1. Go to **https://vercel.com** and sign in.
2. Click **Dashboard** (top left).

---

## Step 2: Find the right project

You need the project that is connected to this GitHub repo: **corona-lending-group**.

- On the Dashboard you see a list of projects.
- Click the project named **corona-lending-group** (or the one that says "corona-lending-group.vercel.app").
- If you donâ€™t see it: click **Add Newâ€¦** â†’ **Project** â†’ **Import Git Repository** â†’ choose **rudycoronaonline-wq/corona-lending-group** â†’ Import. Then continue below.

---

## Step 3: Add rudycorona.com to this project

1. In the **corona-lending-group** project, click **Settings** (top tab).
2. In the left sidebar, click **Domains**.
3. Under "Domains", youâ€™ll see a box to add a domain.
4. Type: **rudycorona.com** and click **Add**.
5. If you also use **www**, add **www.rudycorona.com** the same way.

Vercel will show you what to do next (often: add a CNAME or A record where you bought the domain). Follow the instructions on that screen.

---

## Step 4: Make sure the project builds from GitHub

1. Still in **Settings**, click **Git** in the left sidebar.
2. Check:
   - **Connected Git Repository** = **rudycoronaonline-wq/corona-lending-group**
   - **Production Branch** = **main**
3. If itâ€™s different: click **Disconnect**, then **Connect Git Repository** â†’ **GitHub** â†’ select **corona-lending-group** â†’ set Production Branch to **main**.

---

## Step 5: Redeploy

1. Click **Deployments** (top tab).
2. On the latest deployment, click the **â‹¯** (three dots).
3. Click **Redeploy** â†’ **Redeploy** again to confirm.

Wait until the deployment status is **Ready**.

---

## Step 6: Check the site

Open in your browser:

- **https://www.rudycorona.com**
- **https://www.rudycorona.com/resources/** â€” you should see the **Manhattan Beach Homes** card.
- **https://www.rudycorona.com/manhattan-beach-homes** â€” you should see the full Manhattan Beach page.

---

## If rudycorona.com is already on a different Vercel project

Then the domain is pointing at the wrong project.

1. Open the **other** project (the one that currently has rudycorona.com).
2. Go to **Settings** â†’ **Domains**.
3. Find **rudycorona.com** (and **www.rudycorona.com** if listed).
4. Click **â‹¯** next to the domain â†’ **Remove**.
5. Go back to the **corona-lending-group** project and do **Step 3** above to add rudycorona.com there.

After that, redeploy (**Step 5**) and check **Step 6**.


# Why the live site isnâ€™t updating

Your pushes are going to: **https://github.com/rudycoronaonline-wq/corona-lending-group** (branch `main`).

If **rudycorona.com** doesnâ€™t show the new Resources card or Manhattan Beach page, the Vercel project that serves that domain is **not** building from this repo.

## Fix: Point Vercel at this repo

1. **Open Vercel**  
   Go to [vercel.com](https://vercel.com) and sign in.

2. **Find the project that has rudycorona.com**  
   - Go to **Dashboard** â†’ open the project that has the **rudycorona.com** custom domain.  
   - Or use **Settings** â†’ **Domains** to see which project owns rudycorona.com.

3. **Check the Git connection**  
   In that project:
   - Go to **Settings** â†’ **Git**.
   - Check **Connected Git Repository**:
     - It must be: **rudycoronaonline-wq/corona-lending-group** (or the same repo URL you push to).
     - **Production Branch** should be **main**.

4. **If itâ€™s the wrong repo or branch**  
   - Use **Disconnect** (if needed), then **Connect Git Repository**.
   - Choose **GitHub** â†’ **rudycoronaonline-wq/corona-lending-group**.
   - Set production branch to **main** and save.

5. **Redeploy**  
   - Go to **Deployments**.
   - Open the **â‹¯** menu on the latest deployment â†’ **Redeploy** (or push a new commit to `main` and wait for the new deployment).

6. **Confirm**  
   After the new deployment finishes, open:
   - **https://www.rudycorona.com/resources/**  
   You should see all 6 cards, including **Manhattan Beach Homes**, and the link should go to **/manhattan-beach-homes**.

## If rudycorona.com is on a different host

If the domain is not on Vercel (e.g. WordPress, Wix, Netlify, or another Vercel project), then you need to either:

- Point the domain to the Vercel project that is connected to **rudycoronaonline-wq/corona-lending-group**, or  
- Add the Manhattan Beach card and page in whatever system actually serves rudycorona.com today.


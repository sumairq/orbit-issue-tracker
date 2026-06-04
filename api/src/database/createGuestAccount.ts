import { Comment, Issue, Project, User } from 'entities';
import { ProjectCategory } from 'constants/projects';
import { IssueType, IssueStatus, IssuePriority } from 'constants/issues';
import { createEntity } from 'utils/typeorm';

const seedUsers = (): Promise<User[]> => {
  const users = [
    createEntity(User, {
      email: 'maya@orbitcommerce.io',
      name: 'Maya Chen',
      avatarUrl: 'https://i.ibb.co/f1YqwPK/alex-suprun-ZHv-M3-XIOHo-E-unsplash.jpg',
    }),
    createEntity(User, {
      email: 'david@orbitcommerce.io',
      name: 'David Park',
      avatarUrl: 'https://i.ibb.co/4jZy7PN/christopher-campbell-r-DEOVt-E7v-Os-unsplash-1.jpg',
    }),
    createEntity(User, {
      email: 'alex@orbitcommerce.io',
      name: 'Alex Rivera',
      avatarUrl: 'https://i.ibb.co/ZT5VBNK/may-gauthier-0-J9l9x-Ry-MSo-unsplash.jpg',
    }),
  ];
  return Promise.all(users);
};

const seedProject = (users: User[]): Promise<Project> =>
  createEntity(Project, {
    name: 'Orbit Commerce',
    url: 'https://github.com/orbit/commerce',
    description:
      'Headless e-commerce platform powering the Orbit storefront — product catalog, search, cart, checkout and payments. Q2 focus: ship Stripe payments and harden the checkout for the flash-sale season.',
    category: ProjectCategory.SOFTWARE,
    users,
  });

const seedIssues = (project: Project): Promise<Issue[]> => {
  const { users } = project;

  const issues = [
    createEntity(Issue, {
      title: 'Implement guest checkout flow',
      type: IssueType.STORY,
      status: IssueStatus.DONE,
      priority: IssuePriority.HIGH,
      listPosition: 1,
      description: `<p>Allow shoppers to complete a purchase without creating an account. Account creation should be offered after the order is placed, not before.</p><h3>Acceptance criteria</h3><ul><li>Checkout completes with an email address only — no password required</li><li>The order is associated with the email and can be claimed after sign-up</li><li>A "Create an account" prompt appears on the confirmation screen</li></ul>`,
      estimate: 8,
      timeSpent: 8,
      timeRemaining: 0,
      reporterId: users[1].id,
      project,
      users: [users[0]],
      createdAt: new Date('2026-04-21T09:30:00Z'),
    }),
    createEntity(Issue, {
      title: 'Cart total not updating when a promo code is applied',
      type: IssueType.BUG,
      status: IssueStatus.DONE,
      priority: IssuePriority.HIGH,
      listPosition: 2,
      description: `<p>When a customer applies a valid promo code, the discount shows on the line items but the order total still displays the pre-discount amount until the page is refreshed.</p><h3>Steps to reproduce</h3><ol><li>Add any item to the cart</li><li>Apply promo code <code>WELCOME10</code></li><li>Observe the order summary total</li></ol><p><strong>Expected:</strong> total updates immediately. <strong>Actual:</strong> total only updates after a hard refresh.</p>`,
      estimate: 3,
      timeSpent: 4,
      timeRemaining: 0,
      reporterId: users[2].id,
      project,
      users: [users[1]],
      createdAt: new Date('2026-04-28T14:10:00Z'),
    }),
    createEntity(Issue, {
      title: 'Integrate Stripe for card payments',
      type: IssueType.STORY,
      status: IssueStatus.INPROGRESS,
      priority: IssuePriority.HIGHEST,
      listPosition: 3,
      description: `<p>Replace the placeholder payment step with a real Stripe integration built on Payment Intents and Stripe Elements.</p><ul><li>Support Visa, Mastercard and Amex</li><li>Handle 3-D Secure / SCA challenges</li><li>Store no raw card data on our servers to keep PCI scope minimal</li></ul>`,
      estimate: 13,
      timeSpent: 6,
      timeRemaining: 7,
      reporterId: users[0].id,
      project,
      users: [users[2]],
      createdAt: new Date('2026-05-04T11:00:00Z'),
    }),
    createEntity(Issue, {
      title: 'Build product search with filters and faceting',
      type: IssueType.TASK,
      status: IssueStatus.INPROGRESS,
      priority: IssuePriority.MEDIUM,
      listPosition: 4,
      description: `<p>Customers need to narrow the catalog by category, price range, brand and availability. Facet counts should update live as filters are applied.</p>`,
      estimate: 8,
      timeSpent: 3,
      timeRemaining: 5,
      reporterId: users[1].id,
      project,
      users: [users[0]],
      createdAt: new Date('2026-05-07T08:45:00Z'),
    }),
    createEntity(Issue, {
      title: 'Product images load slowly on mobile (LCP > 4s)',
      type: IssueType.BUG,
      status: IssueStatus.INPROGRESS,
      priority: IssuePriority.HIGH,
      listPosition: 5,
      description: `<p>Largest Contentful Paint on the product detail page exceeds 4 seconds on a throttled 4G connection — hero images are served at full desktop resolution to every device.</p><ul><li>Serve responsive <code>srcset</code> sizes</li><li>Adopt WebP/AVIF with a fallback</li><li>Lazy-load the below-the-fold gallery thumbnails</li></ul>`,
      estimate: 5,
      timeSpent: 2,
      timeRemaining: 3,
      reporterId: users[2].id,
      project,
      users: [users[2]],
      createdAt: new Date('2026-05-11T16:20:00Z'),
    }),
    createEntity(Issue, {
      title: 'Wishlist / save for later',
      type: IssueType.STORY,
      status: IssueStatus.SELECTED,
      priority: IssuePriority.HIGH,
      listPosition: 6,
      description: `<p>Logged-in shoppers should be able to save products to a wishlist and move them to the cart later. Wishlists persist across sessions and devices.</p>`,
      estimate: 5,
      timeSpent: 0,
      reporterId: users[0].id,
      project,
      users: [users[1]],
      createdAt: new Date('2026-05-15T10:05:00Z'),
    }),
    createEntity(Issue, {
      title: 'Order confirmation & shipping notification emails',
      type: IssueType.TASK,
      status: IssueStatus.SELECTED,
      priority: IssuePriority.MEDIUM,
      listPosition: 7,
      description: `<p>Design and wire up the transactional emails for order confirmation and shipment dispatch using the existing template service. Each email should include the order summary, a tracking link and a support contact.</p>`,
      estimate: 5,
      timeSpent: 0,
      reporterId: users[1].id,
      project,
      users: [users[2]],
      createdAt: new Date('2026-05-19T13:40:00Z'),
    }),
    createEntity(Issue, {
      title: 'Inventory oversell during flash sales',
      type: IssueType.BUG,
      status: IssueStatus.SELECTED,
      priority: IssuePriority.HIGHEST,
      listPosition: 8,
      description: `<p>During high-traffic flash sales, concurrent checkouts can sell more units than are in stock because inventory is only decremented after payment rather than reserved earlier.</p><p>Introduce a short-lived stock reservation when an item enters checkout, released on timeout or cancellation.</p>`,
      estimate: 8,
      timeSpent: 0,
      reporterId: users[2].id,
      project,
      users: [users[0]],
      createdAt: new Date('2026-05-22T09:15:00Z'),
    }),
    createEntity(Issue, {
      title: 'Customer reviews and star ratings',
      type: IssueType.STORY,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.MEDIUM,
      listPosition: 9,
      description: `<p>Let verified purchasers leave a 1–5 star rating and a written review on product pages. Show an aggregate rating and surface the most helpful reviews first.</p>`,
      estimate: 8,
      timeSpent: 0,
      reporterId: users[0].id,
      project,
      createdAt: new Date('2026-05-26T15:30:00Z'),
    }),
    createEntity(Issue, {
      title: 'Add typeahead suggestions to the search bar',
      type: IssueType.TASK,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.LOW,
      listPosition: 10,
      description: `<p>Show product and category suggestions as the user types in the search bar, with keyboard navigation and a list of recent searches.</p>`,
      estimate: 5,
      timeSpent: 0,
      reporterId: users[1].id,
      project,
      users: [users[1]],
      createdAt: new Date('2026-05-29T12:00:00Z'),
    }),
    createEntity(Issue, {
      title: 'Checkout button overlaps footer on iPhone SE',
      type: IssueType.BUG,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.LOW,
      listPosition: 11,
      description: `<p>On small viewports (≤375px) the sticky "Place order" button overlaps the page footer, making the terms-and-conditions link unclickable.</p>`,
      estimate: 2,
      timeSpent: 0,
      reporterId: users[2].id,
      project,
      createdAt: new Date('2026-06-01T10:50:00Z'),
    }),
    createEntity(Issue, {
      title: 'Multi-currency support for the EU storefront',
      type: IssueType.STORY,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.LOWEST,
      listPosition: 12,
      description: `<p>Display prices and accept payment in EUR and GBP alongside USD, with currency detected from the shipping country and a manual switcher in the header.</p>`,
      estimate: 13,
      timeSpent: 0,
      reporterId: users[0].id,
      project,
      users: [users[2]],
      createdAt: new Date('2026-06-03T08:20:00Z'),
    }),
  ];
  return Promise.all(issues);
};

const seedComments = (issues: Issue[], users: User[]): Promise<Comment[]> => {
  const comments = [
    createEntity(Comment, {
      body:
        'Shipped and verified in prod. Guest orders are correctly claimable after sign-up. Closing this out. 🎉',
      issueId: issues[0].id,
      userId: users[1].id,
    }),
    createEntity(Comment, {
      body:
        'Nice catch — the total was reading from a cached subtotal. Fixed by recomputing on the cart:updated event. Goes out with the next build.',
      issueId: issues[1].id,
      userId: users[0].id,
    }),
    createEntity(Comment, {
      body:
        'Test keys are in the shared 1Password vault. Use 4242 4242 4242 4242 for the happy path and 4000 0027 6000 3184 to exercise the 3-D Secure flow.',
      issueId: issues[2].id,
      userId: users[1].id,
    }),
    createEntity(Comment, {
      body:
        'Payment Intents are wired up and a basic charge works end to end. Still need to handle the SCA challenge redirect — pushing that today.',
      issueId: issues[2].id,
      userId: users[2].id,
    }),
    createEntity(Comment, {
      body:
        'Facet counts are in. The price range slider gets flaky when there are fewer than three distinct prices — will dig into it tomorrow.',
      issueId: issues[3].id,
      userId: users[0].id,
    }),
    createEntity(Comment, {
      body:
        'Switching the hero to AVIF with a WebP fallback already knocked ~1.6s off LCP on a Moto G4 profile. srcset is next.',
      issueId: issues[4].id,
      userId: users[0].id,
    }),
    createEntity(Comment, {
      body:
        'Can we reuse the cart persistence layer here? A wishlist is basically a second line-item collection without quantities.',
      issueId: issues[5].id,
      userId: users[0].id,
    }),
    createEntity(Comment, {
      body:
        'We saw this twice during the Black Friday dry run. Reserving stock at checkout is the right call — let’s cap the reservation TTL at 10 minutes to match the payment timeout.',
      issueId: issues[7].id,
      userId: users[1].id,
    }),
    createEntity(Comment, {
      body:
        'Worth gating reviews behind a verified purchase from day one — it cuts down spam significantly.',
      issueId: issues[8].id,
      userId: users[2].id,
    }),
    createEntity(Comment, {
      body:
        'Heads up: we’ll need per-currency rounding rules (no half-cents in EUR) and should pull live FX rates daily rather than hard-coding them.',
      issueId: issues[11].id,
      userId: users[1].id,
    }),
  ];
  return Promise.all(comments);
};

const createGuestAccount = async (): Promise<User> => {
  const users = await seedUsers();
  const project = await seedProject(users);
  // Membership is persisted via the Project.users ManyToMany cascade above.
  // Also point each seeded user at this board as their active board so that
  // GET /project returns it after the guest logs in.
  await Promise.all(
    users.map((user) => {
      user.project = project;
      return user.save();
    }),
  );
  const issues = await seedIssues(project);
  await seedComments(issues, project.users);
  return users[2];
};

export default createGuestAccount;

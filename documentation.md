# Angular Basics Workshop

This file contains all steps done to reproduce this project.

## Step 1: Install Node, Yarn and the Angular CLI

First step is to create the environment necessary to work with node
and the tools used (yarn and angular-cli).

1. Download and Install Node at `https://nodejs.org/en/`
2. Install Yarn (`https://yarnpkg.com/en/docs/install`)
3. Install Angular CLI (`yarn global add @angular/cli`)

## Step 2: Create a new Angular App with the CLI

```
ng new expo-angular-basics-workshop \ # name of the app
    --prefix=expo \                   # prefix used for components, etc.
    --directory=. \                   # Create in the current directory
    --skipTests \                     # Do not create test files (not part of this course)
    --skipGit \                       # Skip init of git repo
    --skipInstall \                   # Skip installation of dependencies
    --commit=false \                  # Don't perform a commit
    --style=scss \                    # Use SCSS instead of plain CSS
    --routing                         # Prepare routing
```

More info is available at `https://angular.io/cli/new`.

Since we used `--skipInstall` we will now use yarn to manage and install our
dependencies. Run `yarn`.

## Step 3: Inspect created files

The CLI created a lot of files for us and the app can already be started:

Run `yarn start` and open `http://localhost:4200`.

Most important files created:

| File | Description |
|------|-------------|
| `package.json` | Contains all commands and manages dependencies and project metadata |
| `angular.json` | Contains configuration for the Angular CLI |
| `tsconfig.json` | Compiler settings for Typescript |
| `src/app.module.ts` | Entry point of the app |
| `src/app.component.ts` | Our first component (which is displayed in the browser) |

Now take a look at the sourcecode of the generated webapp. You will see only some basic HTML
and five scripts which are imported. If you now compare the actual DOM there is a lot of
difference. Angular manipulates the DOM at runtime. This is what makes it a "single-page-app"
which is able to display various pages and content with only one initial loading of the whole app.

Please note that there are ways to accomplish lazy-loading and also prerendering of (parts of) the
application, but these are advanced topics not part of this basic course.

## Step 4: Create our first component and view

It is time to start implementing our ToDo app. First, we need a page to display all of our tasks.
It is good practice to seperate views and components which belong together in a separate module.

A module simple contains related code for a single business domain or task and makes the project
clean and overseeable. We therefore create our first module and view-component using the CLI:

`ng generate module modules/overview && ng generate component modules/overview/views/overview`

We can also use the shorter form:

`ng g m modules/overview && ng g c modules/overview/views/overview`

The CLI will automatically create a directory and some files in our `src`-directory. This base-directory
is one of the settings defined in the `angular.json` file.

The console output reads the following:

```
CREATE src/app/modules/overview/overview.module.ts (192 bytes)
CREATE src/app/modules/overview/views/overview/overview.component.scss (0 bytes)
CREATE src/app/modules/overview/views/overview/overview.component.html (27 bytes)
CREATE src/app/modules/overview/views/overview/overview.component.ts (279 bytes)
UPDATE src/app/modules/overview/overview.module.ts (282 bytes)
```

In order to make this new view visible and navigatable in our app, we need to modify two files:

| Change | Description |
|--------|-------------|
| `app.module.ts` | Make the new module available to the application |
| `app-routing.module.ts` | Define the route to the new view |

When opening the browser at `http://localhost:4200/overview` we see that `overview works!`
now appears at the bottom of the page. This is because our `app.component.html` contains
the important `<router-outlet></router-outlet>` after all of the demo content. This is the
place where the currently navigated view will be rendered.

Since we have our first real view now, we can delete the demo content.

In order to make our routing work, we define a placeholder route of `**` which matches
any path and redirect to the main page of our app `overview`. From now on, every path
will take us to the Overview-View.

## Step 5: Add some styles and layout

Our app works fine but looks not very nice. So it's time to define a
basic layout and add some default styles.

Since it is so popular and easy to use, we use [Bootstrap](https://getbootstrap.com/).

In a node project we can simply add it as a dependency:

`yarn add bootstrap`

After installation, we can reference `bootstrap`in our main style file (`src/styles.scss`):

`@import '~bootstrap/scss/bootstrap.scss';`

Now we can give our app a nice frame by creating a new module and two components,
a `Footer` and a `Navbar`. Just like before we use the CLI commands we already know
to achieve this.

- `ng g c modules/navigation`
- `ng g c modules/navigation/components/navbar`
- `ng g c modules/navigation/components/footer`

Note that we do not have a `views` directory in this case, because the footer and navbar
won't be routable by themselves, but they will be used globally in our app. You can therefore
modify the `app.component.html` like this:

```html
<expo-navbar></expo-navbar>
<div class="py-5">
    <router-outlet></router-outlet>
</div>
<expo-footer></expo-footer>
```

Your IDE will now complain about two unknown elements. This is because our two new components
are not yet exported from the `NavigationModule` and the module is not imported in our main
`AppModule`. Go ahead and fix this issue.

At the beginning of this part, we included `bootstrap` and now we already see the benefit. It
is really easy to create a responsive layout and to apply simple styles with predefined classes.

We will assume that `bootstrap` is clear and will not go into detail later in the course.

## Step 6: Dependency Injection

In the previous chapters we learned how to use modules and components
to structure our application into small, controllable parts with
simple and independent responsibilities.

We are now at the point where we want to show some actual data and start
working on our tasks list.

Now we are at a critical point of application architecture because we need
to decide where to put the definition of our data model and (more importantly)
where to put centralized services for handling data. Of course we could just
create some data locally in our component, but we need to think about the future
of the app. It will eventually grow and have more modules, more views, more
components. Since we are dealing with a task-manager, most of the components will
need some kind of data and we do not want to create redundancy or mix responsibilities.

Therefore we create a new `DataModule` and start with the definition of our datamodel
by creating an `interface`. (Dont forget to import the new module!)

Create the file `src/modules/data/models/issue.model.ts`:

```ts
export interface Issue {
    title: string;
    description?: string;
    createdAt: Date;
    done: boolean;
}
```

As described, we need a single part of the app which manages our data. For this usecase
we ceate a `Service` which is a singleton instance of a typescript class which will be
made available to other parts of the app via `Dependency Injection` at runtime.

`ng g s modules/data/services/issue`

When inspecting the new file we find a new decorator named `Injectable`. With this decorator
we can define which parts of the app will have access to the new service. By default, the provider
is available to `root` which is the whole application. Alternatively one or more modules could
be defined to limit the provider's visibility.

Note that the `DataModule` is only imported once in the `AppModule`. Importing it in more modules
would result in multiple instances beeing created. The framework handles scoping and instance creation
by itself with the correct decorators. This process is called `DependencyInjection`.

We can now create some dummy tasks in the service and make them accessible with a `get` property.
In our component, we add the new service as an argument in the constructor:

```ts
export class OverviewComponent implements OnInit {

  constructor(public readonly issueService: IssueService) { }

  ngOnInit() {
  }

}
```

At runtime, the token `IssueService` will be available in the application context and so the local
reference to the service (`issueService`) will be defined.

In our template, we can now use the reference to access and display our issue list.

## Step 7: Seperate open and closed issues

Our new data service is working perfectly fine and our issues are displayed. Of course, we want to get
an overview of our work done and separate open and closed issues. To achieve this, all issues already
have a boolean property `done` which tells us if an issue is still due.

The point of using a framework like Angular is to avoid redundancy and to achieve separation of concerns.
So instead of implementing some logic in our overview component, we create a new component to host a list
of issues:

`ng g c modules/overview/components/issue-list`

In the new component, we use a new decorator provided by Angular: `Input`. By decorating a component's
property with `@Input` we tell the app to bind the property to an `[property]`-directive at the
outside of the component. Besides the `Input`-decorator, an `Output` decorator exists. Both can also
be combined to achieve two-way-databinding.

Simply speaking, `Input` and `Output` define the interface of a component to it's host-component
(in our case the host is `OverviewComponent`).

With our new component and Input in place, we can pass the issue-data directly into the new component.
As a result, we see that we now have two identical issue lists.

In the next step, we need to split the list according to the `done`-property of an issue.
Angular provides a mechanism for manipulating data in the template called `Pipes`. A Pipe is
a simple function which takes some data and optional arguments and returns some data (or nothing).

We can as always create the pipe with a CLI command:

`ng g p modules/overview/pipes/filter-issues`

Inside the `transform` function we simply filter an array of values by some property and value
predicate and return the resulting array (or nothing). In our template we can use the pipe directly
at the `Input` of the issue-list-component and provide the function arguments.

The result looks great. We now have two lists of issues with only open tasks on the left and
only closed tasks on the right.


## Step 8: Introducing Observables

It is a very rare situation when you have an application with only local data. All apps that
we use everyday load and write data from/to some database or other storage lcoation. This means
that we have asynchronous code (because we need to wait for the answer, i.e. over the network).

Javascript offers multiple ways to deal with asynchronous situations:

1. Callbacks
2. Promises
3. Observables (via `rxjs`)

Let me shortly introduce the three methods.

### Callbacks

A callback is a function which is executed when another function has finished execution. A simple
examle with a fake async operation illustrates it:

```js
function myLongRunningTask(callback) {
    let result = undefined;
    setTimeout(function () {
        result = 47;
        callback(result);
    }, 1000);
}

function main() {
    console.log('Starting to fetch result...');
    myLongRunningTask(function (result) {
        console.log(`Result is ${result}`);
    });
}

main();
```

After `myLongRunningTask()` has finished, the callback function is executed with the result as an argument.
As you can imagine, this get's pretty ugly as soon as you have more than one callback chain. Code is not readable
and hard to follow, functions depend on one another, ...

### Promises

Promises are the evolution of callbacks and internally, are still callbacks with a nicer syntax. If you use a recent
version of javascript (or typescript) the syntax is even better with `async/await`. Promises are in my opinion a great way
to handle async code in a pure JS environment or for example on the server side.

```js
function myLongRunningTask() {
    let result = undefined;
    setTimeout(function () {
        result = 42;
        return Promise.resolve(result);
    }, 1000);
}

async function main() {
    console.log('Starting to fetch result...');
    const result = await myLongRunningTask();
    console.log(`Result is ${result}`);
}
```

Not that a function has to be prefixed with `async` in order to be able to use `await` internally. The alternative, older
syntax looks like this:

```js
function myLongRunningTask() {
    let result = undefined;
    setTimeout(function () {
        result = 42;
        return Promise.resolve(result);
    }, 1000);
}

function main() {
    console.log('Starting to fetch result...');
    myLongRunningTask()
        .then(result => {
            console.log(`Result is ${result}`);
        })
        .catch(error => {
            // Handle error...
        });
}
```

While both achieve the same result, the code is much more concise and readable in the first, modern example because it
reads exactly like purely synchronous code. Especially when having multiple chained async functions, the old syntax also
grows fast and is hard to read and to maintain.

### Observables

Observables are a relatively new way to handle async operations and it comes with a wide range of additional features.
Observables are like a data stream to which you attach a listener. In contrast to a Promise which only handles one (the first)
event of sent data, Observables are a declarative way of defining actions for all packages of async data which is passed to an
observer. An example makes it clearer. The following example is in Typescript to make clear which types are returned and acted upon.

```ts
function myLongRunningTask(): Observable<number> {
    return new Observable(observer => {
        setTimeout(() => {
            return observer.next(42);
        }, 1000);
    });
}

function main() {
    myLongRunningTask().subscribe((result: number) => {
        console.log(`Result is ${result}`);
    });
}
```

Since Observables can be used for multiple iterations, the following is possible:

```ts
function timer(): Observable<number> {
    return new Observable(observer => {
        setInterval(() => {
            return new Date().getTime() // time in millis
        }, 1000);
    });
}

function main() {
    timer().subscribe(time => console.log(`Current time: ${time}`));

    // Current time: 1561407445000
    // Current time: 1561407446000
    // Current time: 1561407447000
    // ...
}
```

Observables can be `pipe`d. This means that additional logic can be applied to the result stream. Instead of a manually
made Observable, imagien that we use some API.

```ts
function fetchPrice(productId: string): Observable<number> {
    return this.http.get(`/api/products/${productId}/price`);
}

function main() {
    fetchPrice('4711')
        .pipe(
            map(price => price * 1.19)
        )
        .subscribe(priceWithTax => console.log(priceWithTax))
}
```

A variety of functions exist to modify the result, combine or chain multiple observables,
delay of rate-limit requests, ...

A major benefit is that Angular is designed around Observables. Every internal data stream (e.g. browser navigation),
every event (e.g. keyboard input), every network activity is an Observable. Additionally, observables can be used
directly in the template (HTML) via the `async` pipe (see Ch. 7). This means that often, you do not need any logic
to display async data.

```ts
export class DemoComponent {

    constructor(public readonly webService: WebService) {}

}
```

```html
<h1>
    <ng-container *ngIf="!webService.data | async">Please hold on</ng-container>
    <ng-container *ngIf="!webService.data | async">Here is your data</ng-container>
</h1>
<pre>{{webService.data | async | json}}</pre>
```

## Step 9: Google Firebase

Frontend Development is not complete without using APIs or SDKs to integrate external services.
In our scenario, we need some sort of persistent storage solution to store our tasks and their
current status.

Additionally, it shall be possible to share the data with multiple users of our app (for example
as a team's task board).

A fast and good solution are the services of `Google Firebase`. Firebase offers many services for
mobile and web development. Most of them include free quotas, so they fit perfectly for our demo app.

One of the services is the so-called `Cloud Firestore` which is a document-based key-value storage service.

We will store our data in personalized collections to separate each members individual tasks. Later in the
exercise, we can try to share a single collection and see the live synchronization of the data.

### Integrating Firebase into our Angular App

Since Firebase is also a Google Product, there is an officially supported SDK for Angular, called `@angular/fire`.
This is also the name of the npm package we are going to install for it.

`yarn add @angular/fire`

Now we need to import the new module into our app and provide some config. We will place the config in our app's
environment to have the possibility to separate between `dev` and `prod` environments.

```ts
// File: src/environments/environment.ts

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDiqcvyaoYP8TM-lh6XLWPuppSfKdUZmlI',
    authDomain: 'expo-angular-basic-workshop.firebaseapp.com',
    databaseURL: 'https://expo-angular-basic-workshop.firebaseio.com',
    projectId: 'expo-angular-basic-workshop',
    storageBucket: 'expo-angular-basic-workshop.appspot.com',
    messagingSenderId: '907274111573',
    appId: '1:907274111573:web:eb1c7c42015b2db9',
    collection: '<YOUR_NAME>'
  }
};
```

Please make sure to replace the `collection` with your name to create your individual collection in the storage service.

Afterwards you can import the module in your `app.module.ts`-file:

```ts
@NgModule({
  ...
  imports: [
    ...
    AngularFireModule.initializeApp(environment.firebase)
  ],
  ...
})
export class AppModule { }
```

### Connecting our data service

Now we need to make some changes in our `IssueService` to connect the Cloud Firestore. Since `@angular/fire` is completely
based on Observables, we are now going to use them already.

First, we inject an instance of the `AngularFirestore` by adding it as an argument to our constructor. Angular will automatically
detect the dependency and look for (or create) an instance of it, to make it available to our class.

Now, we can define a reference to our firebase collection. Since we need it for multiple actions later on, we create a private
variable in our service to avoid redundant code.

Afterwards, we use the Observable provided by `snapshotChanges()`. This Observable has the type `DocumentChangeAction<Issue>[]`.
Besides the real document data, these change-actions contain more information about the type of the change (e.g. add, edit, delete)
as well as some metadata about the concerned objects (e.g. their IDs). In our app, we are interested for the payload and the ID
of individual tasks and therefore we define another Observable of type `QueryDocumentSnapshot<Issue>[]` by mapping one Observable
to another one.

```ts
export class IssueService {

  private readonly collection: AngularFirestoreCollection<Issue>;
  private readonly changeActions: Observable<DocumentChangeAction<Issue>[]>;
  readonly issues: Observable<QueryDocumentSnapshot<Issue>[]>;

  constructor(private readonly firestore: AngularFirestore) {
    // Define reference to our collection
    this.collection = this.firestore.collection<Issue>(environment.firebase.collection);
    // Access the Observable for document payload and metadata changes
    this.changeActions = this.collection.snapshotChanges();
    // Map to another type via rxjs-operators and the piping-mechanism
    this.issues = this.changeActions.pipe(
      map(actions => actions.map(action => action.payload.doc))
    )
  }
}
```

Note that we have only described what will happen to the Observables and the containing data. If nobody actually
subscribes to the observables, no code will be executed. Observables are therefore a declarative way of data
handling. This is in contrast to Promises, where a first function must be invoked to start the process and a second
callback function is invoked as soon as the Promise resolves.

The only public property of our `IssueService` is `issues`, an Observable. This means that we can no subscribe to
the observable and start seeing real data.

Since we already injected the `IssueService` in our `OverviewComponent`, we only need to adjust the template to take
into account the async nature of Observables:

```html
<section class="container">
  <div class="row">
    <div class="col-12 col-md-6 mb-3 mb-md-0">
      <expo-issue-list [issues]="issueService.issues | async | filterIssues: 'done' : false" [listTitle]="'Open'"></expo-issue-list>
    </div>
    <div class="col-12 col-md-6">
      <expo-issue-list [issues]="issueService.issues | async | filterIssues: 'done' : true" [listTitle]="'Closed'"></expo-issue-list>
    </div>
  </div>
</section>
```

As described in the previous section, the `async` pipe will handle subscribing and unsubscribing (when the component is not displayed
anymore) automatically.

We also need to adjust our `IssueList` and `IssueCard` components because we are no dealing with `QueryDocumentSnapshot<Issue>` and
not a simple `Issue`.

If everything worked out, we now see some live data in our browser.

## Step 10: Detail View

To finalize our app, we also need a detail page to view a single issue and to be able to edit it.

We therefore create a new module and view as described in the sections before.

In the routing configuration, we now use two new features: Placeholders and Resolvers:

```ts
const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'issues/:id',
    component: DetailComponent,
    resolve: {
      issue: DetailViewResolver
    }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'overview'
  }
];
```

The placeholder `:id` will be replaced by an issue's ID in order to create a unique link to this single item.
The resolver is a mechanism to load data before the view is loaded. It is simply a function which asks our service
for the specific issue:

```ts
export class DetailViewResolver implements Resolve<AngularFirestoreDocument<Issue>> {

    constructor(
        private readonly service: IssueService,
        private readonly router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AngularFirestoreDocument<Issue> {
        const id = route.params['id'];
        if (!id) {
            this.router.navigate(['']);
            return null;
        }
        return this.service.getIssue(id);
    }
}
```

Later in the `DetailComponent` we can access the routes data like that:

```ts
constructor(
    private readonly route: ActivatedRoute
) { }

ngOnInit() {
    this.issueDoc = this.route.snapshot.data.issue;
}
```

In this view, we use Angular Forms to bind our issue data to input fields. Using `(blur)` and `(change)`
outputs we can react to user input and update the issue in firebase using a builtin SKD function.

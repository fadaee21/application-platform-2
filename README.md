
# API Data Fetching Guide

This guide provides examples of how to fetch data using the POST method in different scenarios.


## 1. Fetch Data with POST Method

To fetch data using the POST method, use the following code:

```typescript
const fetcherPost = useFetcherPost();

const fetchUrl = "http://78.109.199.178:8080/v1/admins/user/search?page=0&size=10";

const { data, isLoading } = useSWR(fetchUrl, {
  fetcher: () =>
    fetcherPost<any, any>(fetchUrl, {
      arg: {
        userStatus: 3,
      },
    }),
});
```


## 2. GET Data with POST Method on Page Load

To GET data using the POST method when the page is first rendered and the argument state changes, use the following code:

```typescript
const fetcherPost = useFetcherPost();

const fetchUrl = (key: string | undefined = "") =>
  `http://78.109.199.178:8080/v1/admins/user/search?page=0&size=10&key=${key}`;

const { data, isLoading } = useSWR(
  selectedOption?.value ? fetchUrl(selectedOption.value) : null,
  (url) =>
    fetcherPost<any, any>(url, {
      arg: {
        userStatus: selectedOption?.value,
      },
    })
);
```


## 3. POST Data with POST Method

To POST data using the POST method, use the following code:

```typescript
const fetcherPost = useFetcherPost();

const { trigger, isMutating } = useSWRMutation(
  "/panel/login",
  fetcherPost<TLoginInfo, LoginResponse>
);

const response = await trigger({
  password: pwd,
  username: user,
  role,
});
```
import Pagination from "./Pagination.astro";

const makePage = (current: number, last: number) => ({
  currentPage: current,
  lastPage: last,
  url: {
    prev: current > 1 ? `/posts/${current - 1}` : undefined,
    next: current < last ? `/posts/${current + 1}` : undefined,
    current: `/posts/${current}`,
    first: "/posts/1",
    last: `/posts/${last}`,
  },
  data: [],
  start: (current - 1) * 10,
  end: current * 10 - 1,
  total: last * 10,
  size: 10,
});

const meta = {
  title: "Components/Astro/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Previous / Next pagination nav. Only rendered when `page.lastPage > 1`. Prev/Next buttons are disabled (rendered as `<span>`) when there is no adjacent page.",
      },
    },
  },
};

export default meta;

export const MiddlePage = {
  args: { page: makePage(3, 7) },
};

export const FirstPage = {
  args: { page: makePage(1, 7) },
};

export const LastPage = {
  args: { page: makePage(7, 7) },
};

export const TwoPages = {
  args: { page: makePage(1, 2) },
};

export const SinglePage = {
  args: { page: makePage(1, 1) },
  parameters: {
    docs: {
      description: {
        story:
          "When there is only one page, the pagination component renders nothing.",
      },
    },
  },
};

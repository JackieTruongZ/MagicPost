# MagicPost - ứng dụng quản lý vận đơn cho công ty giao hàng

## Công nghệ chính sử dụng

### Ngôn ngữ và framework :

    Sử dụng javascript/typescript => sử dụng TS giúp code theo hướng đối tượng dễ dàng hơn
    Đối với Backend : sử  dụng NestJS + Prisma + Postgresql , sử dụng ts giúp code back end hướng đối tượng
    dễ dàng hơn cộng với trình quản lý model prisma giúp tiện lợi trong quá trình thiết lập quan hệ giữa
    các model
    Postgresql là hệ quản trị cơ sở dữ liệu mã nguồn mở giúp linh hoạt trong các khâu xử lý phân cấp và graphic

    Đối với Frontend : sử dụng NextJs để làm framework chính, với sự linh hoạt kèm khả năng
    SSR (Server Side Rendering) giúp cho hệ thống chạy ổn định và mượt hơn

### Công cụ deploy :

    Sử dụng 2 công cụ chính là render và netify giúp deploy và tối ưu hóa performance cho hệ thống
    về lưu trữ asset thì firebase là công cụ giúp làm việc đó một cách thoải mái

## Cách chạy :

### Đối với backend

```typescript
cd backend // vào thư mục backend
yarn // cài đặt gói
yarn start:dev // chạy dev
```

### Đối với frontend

```typescript
cd frontend // vào thư mục
npm i // cài đặt gói
npm run dev // chạy dev
```

## Phân chia công việc :

### 1 - Backend

    Họ và tên:      Nguyễn Trường Đạt - Trưởng nhóm
    Mã sinh viên:   21020300
    Nhiệm vụ:       - Phân công công việc
                    - Phụ trách xây dựng, hình thành mô hình cơ sở dữ liệu, các biểu đồ cần thiết để hình dung ra cách vận
                    hành cơ sở dữ liệu sử dụng cho dự án - Phụ trách chủ yếu back end, trực tiếp xây dựng và quản lí cơ sở
                    dữ liệu mà dự án sử dụng.
                    - Hỗ trợ code front end, tạo các giao diện liên quan tới thống kê tài khoản
                    điểm giao dịch, điểm tập kết, ... cũng như phát triển một số tính năng khác

### 2 - Frontend

    Họ và tên:      Nguyễn Khánh Duy
    Mã sinh viên:
    Nhiệm vụ:       - Phụ trách front end, tìm hiểu template và layout cho các page tùy theo các ca sử dụng khác nhau của người dùng.
                    - Sử dụng các công cụ thiết kế để vẽ ra layout front end đơn giản trước khi bắt tay vào code.
                    - Thực hiện code giao diện các trang tương tác với người dùng: Menu, Footer, Cấp tài khoản, tìm kiếm đơn hàng, ...
                    - đồng thời phụ trách phần API tương ứng để đẩy những dữ liệu cần thiết lên trên cở sở dữ liệu
                    cũng như nhận dữ liệu từ cơ sở dữ liệu cũng như các Components khác của frontend.

    Họ và tên:      Nguyễn Hữu Việt Cương
    Mã sinh viên:   21020538
    Nhiệm vụ:       - Phụ trách front end, tìm hiểu template và layout cho các page tùy theo các ca sử dụng khác nhau của người dùng.
                    - Sử dụng các công cụ thiết kế để vẽ ra layout front end đơn giản trước khi bắt tay vào code.
                    - Thực hiện code giao diện các trang tương tác với người dùng: Menu, Header, Đăng nhập, tạo đơn, ...
                    - đồng thời phụ trách phần API tương ứng để đẩy những dữ liệu cần thiết lên trên cở sở dữ liệu cũng như
                    - nhận dữ liệu từ cơ sở dữ liệu. cũng như các Components khác của frontend.

Link Demo: https://main--visionary-muffin-079907.netlify.app/

Link Video Thuyết trình: https://drive.google.com/file/d/1kdLOIE3UbrBRvLq1xdM9jE6Qsqv-jqwF/view?fbclid=IwAR2ubhKC5n-tqG6MW1dJNDaup5a8vfKGSB82NbhcQpFdp0jEaQFd1UpH4QI

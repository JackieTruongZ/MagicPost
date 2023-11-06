# Mot so cau lenh git thuong gap
    - Clone: Đây là câu lệnh để sao chép một repository từ xa vào máy tính của bạn. Sử dụng câu lệnh git clone [url] để sao chép repository.

    - Pull: Câu lệnh git pull được sử dụng để cập nhật repository của bạn với phiên bản mới nhất từ repository gốc. Điều này đảm bảo rằng bạn có phiên bản mới nhất của mã nguồn trước khi bạn bắt đầu làm việc.

    - Branch: Câu lệnh git branch cho phép bạn tạo, xem và quản lý các nhánh của repository. Tạo một nhánh mới với câu lệnh git branch [branch-name], chuyển đổi sang một nhánh với câu lệnh git checkout [branch-name], và xem danh sách các nhánh với câu lệnh git branch -a.

    - Add: Sử dụng câu lệnh git add [file] để thêm các tệp đã thay đổi vào trạng thái chuẩn bị commit. Bạn có thể sử dụng git add . để thêm tất cả các tệp đã thay đổi.

    - Commit: Câu lệnh git commit -m "[message]" cho phép bạn tạo một commit mới với tin nhắn mô tả những gì đã thay đổi trong commit đó. Commit là một bước quan trọng trong Git để ghi lại các thay đổi và xây dựng lịch sử của mã nguồn.

    - Push: Khi bạn đã thực hiện commit, bạn có thể sử dụng câu lệnh git push để đẩy các commit vào repository từ xa. Điều này cho phép các thành viên khác trong nhóm cập nhật và xem các thay đổi của bạn.

    - Pull Request: Đối với các dự án lớn hơn hoặc khi làm việc trong nhóm, việc sử dụng pull request là một phần quan trọng để kiểm tra và xem xét các thay đổi trước khi hợp nhất vào nhánh chính. Câu lệnh git request-pull hoặc giao diện người dùng trực quan trên nền tảng dịch vụ lưu trữ git của bạn có thể được sử dụng để tạo pull request.

    - Merge: Câu lệnh git merge [branch-name] cho phép bạn hợp nhất các thay đổi từ một nhánh vào nhánh hiện tại. Điều này thường được sử dụng khi pull request đã được xem xét và chấp nhận.

    - Rebase: Câu lệnh git rebase cho phép bạn tái cấu trúc lại lịch sử commit của nhánh hiện tại trên cơ sở của một nhánh khác. Việc rebase có thể giúp duy trì lịch sử commit sạch sẽ và tránh việc tạo ra các commit không cần thiết.

    - Fetch: Câu lệnh git fetch được sử dụng để tải về các thay đổi từ repository từ xa mà không hợp nhất vào nhánh hiện tại. Điều này có thể giúp bạn kiểm tra và xem những thay đổi mới nhất trước khi bạn quyết định hợp nhất vào nhánh của mình.

# Vi du : 
    
    1. Clone:
    ```
    git clone https://github.com/your-username/repository.git
    ```
    Ví dụ: `git clone https://github.com/johndoe/my-project.git`

    2. Pull:
    ```
    git pull
    ```
    Ví dụ: `git pull`

    3. Branch:
    ```
    git branch new-feature
    ```
    Ví dụ: `git branch new-feature`

    4. Add:
    ```
    git add file.txt
    ```
    Ví dụ: `git add file.txt`

    5. Commit:
    ```
    git commit -m "Added new feature"
    ```
    Ví dụ: `git commit -m "Added new feature"`

    6. Push:
    ```
    git push origin main
    ```
    Ví dụ: `git push origin main`

    7. Pull Request:
    Trong giao diện người dùng trực quan của dịch vụ lưu trữ Git, bạn có thể tạo một pull request từ nhánh của bạn.

    8. Merge:
    ```
    git merge new-feature
    ```
    Ví dụ: `git merge new-feature`

    9. Rebase:
    ```
    git rebase main
    ```
    Ví dụ: `git rebase main`

    10. Fetch:
    ```
    git fetch
    ```
    Ví dụ: `git fetch`

    Lưu ý rằng các ví dụ trên chỉ mang tính chất minh họa và giả sử bạn đã cấu hình môi trường Git đúng. Bạn cần thay đổi các đối số như URL repository, tên nhánh hoặc tên tệp tin để phù hợp với dự án của bạn.





sửa file , -> git add -> (thay đổi) -> git commit -m "tên thay đổi" -> () -> git push origin main 

git push origin dev 
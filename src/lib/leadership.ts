// BNI MASTER leadership roster (term 2026) with role responsibilities from
// the BNI standard guideline "Vai trò Ban điều hành Chapter". People link to
// their member profile via slug when they are a chapter member with a page.

import type { LocalizedText } from "./members";

export interface LeadershipPerson {
  name: string;
  slug: string | null;
}

export interface LeadershipRole {
  title: LocalizedText;
  people: LeadershipPerson[];
  duties: LocalizedText[];
}

export interface LeadershipTeam {
  id: string;
  title: LocalizedText;
  roles: LeadershipRole[];
}

export const leadershipTeams: LeadershipTeam[] = [
  {
    id: "ban-dieu-hanh",
    title: { vi: "Ban Điều Hành", en: "Executive Board" },
    roles: [
      {
        title: { vi: "Chủ Tịch", en: "President" },
        people: [{ name: "Lê Lương Quân", slug: "le-luong-quan" }],
        duties: [
          { vi: "Điều hành buổi họp Chapter chuyên nghiệp và đúng quy trình", en: "Runs chapter meetings professionally and by the book" },
          { vi: "Đảm bảo các thành viên Ban điều hành thể hiện đúng vai trò của mình", en: "Ensures every leadership team member performs their role" },
          { vi: "Tổ chức và điều hành buổi họp Chapter Success Meeting hằng tháng", en: "Organizes and chairs the monthly Chapter Success Meeting" },
          { vi: "Hỗ trợ Chapter thiết lập và đạt mục tiêu qua những hoạt động cụ thể, thiết thực", en: "Helps the chapter set and reach its goals through concrete activities" },
          { vi: "Tương tác hằng tuần với Giám đốc hỗ trợ", en: "Connects weekly with the supporting Director" },
        ],
      },
      {
        title: { vi: "Phó Chủ Tịch", en: "Vice President" },
        people: [{ name: "Huỳnh Thế Vinh", slug: "huynh-the-vinh" }],
        duties: [
          { vi: "Điều hành và quản lý Ban thành viên", en: "Leads and manages the Membership Committee" },
          { vi: "Là cầu nối giữa Giám đốc Chapter, Chủ tịch và Thành viên", en: "Bridge between the Chapter Director, President and members" },
          { vi: "Đảm bảo từng thành viên hiểu rõ quy định, chính sách của BNI", en: "Ensures every member understands BNI policies" },
          { vi: "Duy trì tính kỷ luật và cam kết trong hoạt động của Chapter", en: "Maintains discipline and commitment across chapter activities" },
          { vi: "Dẫn dắt buổi họp Chapter khi Chủ tịch vắng mặt", en: "Chairs chapter meetings in the President's absence" },
        ],
      },
      {
        title: { vi: "Tổng Thư Ký", en: "Secretary Treasurer" },
        people: [{ name: "Lư Trần Đỉnh", slug: "lu-tran-dinh" }],
        duties: [
          { vi: "Liên hệ với văn phòng BNI về phí thành viên và tài khoản BNI Connect", en: "Liaises with the BNI office on membership fees and BNI Connect accounts" },
          { vi: "Giữ quỹ Chapter và chịu trách nhiệm thu chi", en: "Keeps the chapter treasury and manages income and expenses" },
          { vi: "Xếp lịch diễn giả Feature Presentation và giới thiệu diễn giả hằng tuần", en: "Schedules and introduces the weekly Feature Presentation speaker" },
          { vi: "Cung ứng tài liệu và vật tư cần thiết cho Chapter", en: "Supplies the chapter's materials and equipment" },
        ],
      },
    ],
  },
  {
    id: "xay-dung-dao-tao",
    title: { vi: "Xây Dựng Chapter & Đào Tạo Networking", en: "Chapter Growth & Networking Education" },
    roles: [
      {
        title: { vi: "Phụ Trách Xây Dựng Chapter", en: "Chapter Growth" },
        people: [
          { name: "Nguyễn Vũ Ngọc Châu", slug: "nguyen-vu-ngoc-chau" },
          { name: "Trần Thị Thu Thủy", slug: "tran-thi-thu-thuy" },
        ],
        duties: [
          { vi: "Giúp Chapter tăng trưởng về số lượng và chất lượng; xác định 10 ngành nghề Chapter cần tìm kiếm", en: "Grows the chapter in size and quality; maintains the top-10 target industries list" },
          { vi: "Báo cáo PALMS hằng tuần và theo dõi thực trạng hiện diện của thành viên", en: "Reports weekly PALMS and tracks member attendance" },
          { vi: "Chăm sóc thành viên vắng mặt và gửi thư cảnh báo về sự hiện diện khi cần", en: "Follows up with absent members and sends attendance warnings when needed" },
          { vi: "Hướng dẫn thành viên cách tìm và huấn luyện người đi họp thay", en: "Coaches members on finding and training meeting substitutes" },
        ],
      },
      {
        title: { vi: "Điều Phối Đào Tạo Networking", en: "Networking Education Coordinator" },
        people: [
          { name: "Bùi Kim Kiều", slug: "bui-kim-kieu" },
          { name: "Nguyễn Thị Anh Thư", slug: null },
        ],
        duties: [
          { vi: "Điều phối phần Networking Education trong buổi họp hằng tuần", en: "Delivers the Networking Education segment in the weekly meeting" },
          { vi: "Hỗ trợ, giám sát thành viên tham dự các khoá đào tạo trong khu vực theo quy định của BNI", en: "Supports and tracks members' participation in regional BNI trainings" },
        ],
      },
    ],
  },
  {
    id: "chat-luong-gan-ket",
    title: { vi: "Chất Lượng & Gắn Kết Thành Viên", en: "Member Quality & Engagement" },
    roles: [
      {
        title: { vi: "Phụ Trách Chất Lượng Thành Viên", en: "Member Quality" },
        people: [
          { name: "Nguyễn Phương Đông", slug: "nguyen-phuong-dong" },
          { name: "Bùi Thị Liên", slug: "bui-thi-lien" },
        ],
        duties: [
          { vi: "Đảm bảo thành viên mới là những doanh nghiệp uy tín, chất lượng, phù hợp chiến lược phát triển của Chapter", en: "Ensures new members are reputable businesses that fit the chapter's strategy" },
          { vi: "Xem xét đơn xin gia nhập, kiểm tra ngành nghề và gọi điện tham chiếu", en: "Reviews applications, checks industry seats and calls references" },
          { vi: "Tham gia thẩm định thành viên mới và tổ chức Lễ kết nạp", en: "Joins new-member vetting and organizes induction ceremonies" },
        ],
      },
      {
        title: { vi: "Phụ Trách Gắn Kết Thành Viên", en: "Member Engagement" },
        people: [
          { name: "Nguyễn Thị Ánh Hồng", slug: null },
          { name: "Robert Tuấn", slug: "robert-tuan" },
        ],
        duties: [
          { vi: "Thực hiện các hoạt động nhằm gia tăng tỷ lệ tái gia nhập của thành viên", en: "Drives activities that raise the member renewal rate" },
          { vi: "Hỗ trợ thành viên hoạt động hiệu quả với các công cụ của BNI", en: "Helps members use BNI tools effectively" },
          { vi: "Đảm bảo việc tái gia nhập đúng quy trình và tổ chức Lễ tái gia nhập", en: "Ensures renewals follow due process and organizes renewal ceremonies" },
        ],
      },
    ],
  },
  {
    id: "quan-he-dinh-huong",
    title: { vi: "Mối Quan Hệ & Định Hướng Thành Viên", en: "Member Relations & Orientation" },
    roles: [
      {
        title: { vi: "Phụ Trách Mối Quan Hệ Thành Viên", en: "Member Relations" },
        people: [
          { name: "Nguyễn Hồng Huệ", slug: "nguyen-hong-hue-hue-yose" },
          { name: "Trần Nguyễn Thuý Phượng", slug: "tran-nguyen-thuy-phuong" },
        ],
        duties: [
          { vi: "Giúp các thành viên xây dựng mối quan hệ chất lượng", en: "Helps members build quality relationships" },
          { vi: "Tiếp nhận và xử lý các tranh chấp, khiếu nại trong Chapter theo đúng quy trình", en: "Receives and resolves disputes and complaints by due process" },
          { vi: "Tạo các sự kiện trong và ngoài Chapter để gắn kết thành viên", en: "Creates bonding events inside and outside the chapter" },
        ],
      },
      {
        title: { vi: "Điều Phối Định Hướng Thành Viên", en: "Member Orientation Coordinator" },
        people: [
          { name: "Huỳnh Thị Cẩm Trang", slug: "huynh-thi-cam-trang" },
          { name: "Lê Tuấn Anh", slug: "le-tuan-anh" },
        ],
        duties: [
          { vi: "Trợ giúp thành viên mới khởi đầu tuyệt vời qua chương trình Passport to Success", en: "Gives new members a great start through Passport to Success" },
          { vi: "Hướng dẫn thành viên mới hiểu rõ mục tiêu và nội dung định hướng", en: "Guides new members through orientation goals and content" },
          { vi: "Đảm bảo thành viên mới hoàn tất khóa đào tạo MSP trong 6–8 tuần sau khi gia nhập", en: "Ensures new members complete MSP training within 6–8 weeks of joining" },
        ],
      },
    ],
  },
  {
    id: "ban-khach-moi",
    title: { vi: "Ban Khách Mời", en: "Visitor Team" },
    roles: [
      {
        title: { vi: "Điều Phối Khách Mời", en: "Visitor Coordinator" },
        people: [{ name: "Trần Ái Vi", slug: "tran-ai-vi" }],
        duties: [
          { vi: "Điều phối các hoạt động tạo ấn tượng tốt đẹp cho khách mời khi đến tham dự buổi họp", en: "Coordinates everything that makes a great first impression on visitors" },
          { vi: "Thiết lập kỳ vọng và giới thiệu khách mời với Ban điều hành, Contact Sphere phù hợp", en: "Sets expectations and introduces visitors to the leadership team and the right Contact Sphere" },
          { vi: "Cập nhật và quản lý danh sách khách mời trên BNI Connect", en: "Maintains the visitor list on BNI Connect" },
        ],
      },
      {
        title: { vi: "Phụ Trách Đón Tiếp Khách Mời", en: "Visitor Hosts" },
        people: [
          { name: "Nguyễn Duy Anh", slug: "nguyen-duy-anh" },
          { name: "Võ Thu Vy", slug: "vo-thu-vy" },
        ],
        duties: [
          { vi: "Liên hệ chào mừng và hướng dẫn khách mời trước buổi họp", en: "Welcomes and briefs visitors before the meeting" },
          { vi: "Quản lý và sắp xếp bàn check-in tại mỗi buổi họp; đón tiếp khách mời", en: "Runs the check-in desk and greets visitors at every meeting" },
        ],
      },
      {
        title: { vi: "Phụ Trách Định Hướng Khách Mời", en: "Visitor Orientation" },
        people: [{ name: "Trần Thị Tuyết Hằng", slug: "tran-thi-tuyet-hang" }],
        duties: [
          { vi: "Hướng dẫn chỗ ngồi và những bước cần lưu ý trong buổi họp", en: "Guides seating and what to expect during the meeting" },
          { vi: "Giới thiệu khách mời với Ban điều hành Chapter và thành viên", en: "Introduces visitors to the leadership team and members" },
          { vi: "Chăm sóc, giải đáp câu hỏi của khách mời về việc gia nhập BNI", en: "Answers visitors' questions about joining BNI" },
        ],
      },
      {
        title: { vi: "Phụ Trách Hỗ Trợ Khách Mời", en: "Visitor Support" },
        people: [
          { name: "Lê Thanh Hiếu", slug: "le-thanh-hieu" },
          { name: "Đinh Hồng Hải", slug: "dinh-hong-hai" },
        ],
        duties: [
          { vi: "Chăm sóc tất cả khách mời sau buổi họp; nhập thông tin lên hệ thống BNI Connect", en: "Follows up with every visitor after the meeting and logs them in BNI Connect" },
          { vi: "Gửi thư cảm ơn khách mời đã tham dự buổi họp", en: "Sends thank-you notes to visitors" },
          { vi: "Tư vấn và giải đáp câu hỏi của khách mời trong vòng 48h sau buổi họp", en: "Answers visitors' questions within 48 hours of the meeting" },
        ],
      },
    ],
  },
  {
    id: "ban-thu-ky",
    title: { vi: "Ban Thư Ký", en: "Secretariat" },
    roles: [
      {
        title: { vi: "Thư Ký", en: "Secretary" },
        people: [
          { name: "Lâm Văn Chùm", slug: "lam-van-chum" },
          { name: "Hà Mỹ Linh", slug: "ha-my-linh" },
          { name: "Mai Xuân Ninh", slug: "mai-xuan-ninh" },
          { name: "Lê Tuấn Sơn", slug: "le-tuan-son" },
        ],
        duties: [
          { vi: "Hỗ trợ Tổng Thư Ký trong công tác vận hành, tài liệu và hậu cần của Chapter", en: "Supports the Secretary Treasurer with chapter operations, documents and logistics" },
        ],
      },
    ],
  },
  {
    id: "ban-co-van",
    title: { vi: "Ban Cố Vấn — Advisory Board", en: "Advisory Board" },
    roles: [
      {
        title: { vi: "Cố Vấn", en: "Advisor" },
        people: [
          { name: "Nguyễn Văn Thân", slug: null },
          { name: "Trần Nguyễn Thuý Phượng", slug: "tran-nguyen-thuy-phuong" },
          { name: "Trương Thị Nguyệt Ánh", slug: "truong-thi-nguyet-anh" },
          { name: "Phan Thị Thu Thuỷ", slug: null },
          { name: "Đặng Bảo Huân", slug: null },
          { name: "Nguyễn Đình Thân", slug: "nguyen-dinh-than" },
        ],
        duties: [
          { vi: "Đồng hành và cố vấn chiến lược cho Ban điều hành trong hoạt động phát triển Chapter", en: "Advises the leadership team on chapter strategy and development" },
        ],
      },
    ],
  },
  {
    id: "giam-doc-tang-truong",
    title: { vi: "Giám Đốc Tăng Trưởng", en: "Growth Director" },
    roles: [
      {
        title: { vi: "Giám Đốc Tăng Trưởng — BNI HCM Central", en: "Growth Director — BNI HCM Central" },
        people: [{ name: "Trương Thị Thanh Thuý", slug: null }],
        duties: [
          { vi: "Đại diện BNI khu vực HCM Central đồng hành, hỗ trợ Chapter tăng trưởng", en: "Represents BNI HCM Central, supporting the chapter's growth" },
        ],
      },
    ],
  },
];

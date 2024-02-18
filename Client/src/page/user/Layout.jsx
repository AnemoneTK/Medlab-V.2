

export function UserLayout(){
    return(
        <>
        <nav classNameName="main-header navbar navbar-expand navbar-white navbar-light">

<ul classNameName="navbar-nav">
    <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
    </li>
</ul>
<ul className="navbar-nav ml-auto">

    <li className="nav-item dropdown mr-2">
        <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-bell" style="font-size: 24px;"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-header">
             Notifications</span>
            <div className="dropdown-divider"></div>
            
            <div className="dropdown-divider" ></div>
            <a className="dropdown-item" onclick="navigatePage('./print/showStock.php')">
                <i className="fa-solid fa-box"></i> ยาเหลือน้อย
                <span className="float-right text-muted font-weight-bold">
                
                </span>
            </a>
            <a className="dropdown-item" onclick="navigatePage('./print/showEXP.php')">
                <i className="fa-solid fa-calendar-days"></i> ยาใกล้หมดอายุ
                <span className="float-right text-muted font-weight-bold">
               
                </span>
            </a>
            
        </div>
    </li>

</ul>
</nav>



<aside className="main-sidebar sidebar-dark-primary elevation-4" style="background-color: #1B2938; ">
<a href="#" className="brand-link d-flex align-items-center" style="cursor:default;">
<img src="../resource/img/LogoWhite.png" alt="Medlab Logo" className=" img-fluid" style="height:auto; max-height:80px;" />
<span className="brand-text font-weight-Bold ml-2" style="font-size: 30px; color:#ffff;">MEDLAB</span>
</a>

<div className="sidebar" style="height: 88.6vh; position:relative;">
<nav className="mt-5">
    <ul className="nav nav-pills nav-sidebar flex-column mb-auto" data-widget="treeview" role="menu" data-accordion="false">

        <li className="nav-item">
            <a className="nav-link activeMenu" id="menu" onclick="navigatePage('./dashboard.php')">
                <i className="nav-icon fa-solid fa-chart-area"></i>
                <p>
                    ภาพรวม
                </p>
            </a>
        </li>

        {/* Inventory Start  */}
        <li className="nav-item">
            <a className="nav-link headDropdown" id="hd">
            <i className="nav-icon fa-solid fa-pills"></i>
                <p style="user-select: none">
                    จัดการคลังยา
                    <i className="right fas fa-angle-left"></i>
                </p>
            </a>
            <ul className="nav nav-treeview">
                <li className="nav-item " onclick="navigatePage('./product/showAllProduct.php')">
                    <a className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p style="user-select: none">รายการยาทั้งหมด</p>
                    </a>
                </li>
                <li className="nav-item " onclick="navigatePage('./product/addProductFromOrder.php')">
                    <a className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p style="user-select: none">เพิ่มยาจากคำสั่งซื้อ</p>
                    </a>
                </li>
                <li className="nav-item " onclick="navigatePage('./product/addProductForm.php')">
                    <a className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p style="user-select: none">เพิ่มยาใหม่</p>
                    </a>
                </li>
                
            </ul>
        </li>
        {/* <!-- Inventory End --> */}

        {/* <!-- warehouse Start --> */}
        <li className="nav-item">
            <a className="nav-link" id="menu" onclick="navigatePage('./warehouse/warehouse.php')">
                <i className="nav-icon fa-solid fa-warehouse"></i>
                <p>
                    ตำแหน่งจัดเก็บ
                </p>
            </a>
        </li>
        {/* <!-- warehouse End --> */}
        
        {/* <!-- Report Start --> */}
        <li className="nav-item">
            <a className="nav-link headDropdown" id="hd">
                <i className="nav-icon fa-solid fa-print"></i>
                <p>
                    ออกเอกสารรายงาน
                    <i className="right fas fa-angle-left"></i>
                </p>
            </a>
            <ul className="nav nav-treeview">
                <li className="nav-item">
                    <a className="nav-link" onclick="navigatePage('./order/order.php')">
                        <i className="far fa-circle nav-icon"></i>
                        <p>คำขอสั่งซื้อ</p>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onclick="navigatePage('./withdraw/withdraw.php')">
                        <i className="far fa-circle nav-icon"></i>
                        <p>การเบิกยา</p>
                    </a>
                </li>
                <li className="nav-item ">
                    <a className="nav-link" onclick="navigatePage('./print/printProduct.php')">
                        <i className="far fa-circle nav-icon"></i>
                        <p>ยาทั้งหมด</p>
                    </a>
                </li>
                <li className="nav-item " onclick="navigatePage('./print/showWarehouse.php')">
                    <a className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>ตำแหน่งจัดเก็บ</p>
                    </a>
                </li>
                <li className="nav-item " onclick="navigatePage('./print/showStock.php')">
                    <a className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>ยาที่จำนวนเหลือน้อย</p>
                    </a>
                </li>
                <li className="nav-item" onclick="navigatePage('./print/showEXP.php')">
                    <a className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>ยาที่ใกล้หมดอายุ</p>
                    </a>
                </li>
            </ul>
        </li>
        {/* <!-- Report End --> */}

        {/* <!-- History Start --> */}
        <li className="nav-item">
            <a className="nav-link headDropdown" id="hd">
                <i className="nav-icon fa-solid fa-clock-rotate-left "></i>
                <p>
                    ประวัติการดำเนินการ
                    <i className="right fas fa-angle-left"></i>

                </p>
            </a>
            <ul className="nav nav-treeview">
                <li className="nav-item" onclick="navigatePage('./order/orderHistory.php')">
                    <a className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>ประวัติการสั่งซื้อยา</p>
                    </a>
                </li>
                <li className="nav-item" onclick="navigatePage('./withdraw/withdrawHistory.php')">
                    <a className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>ประวัติการเบิกออก</p>
                    </a>
                </li>
            </ul>
        </li>
        {/* <!-- History End --> */}
       
    </ul>


</nav>

<div className="btn-group dropup w-100" style="position:absolute; bottom: 0; left:0;">
    <button type="button" className="btn btn-secondary dropdown-toggle text-center" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
    style="border-radius: 0; position:relative;">
        <i className="fa-solid fa-arrow-right-from-bracket mx-2 "></i>
        ออกจากระบบ
    </button>
    <div className="dropdown-menu align-items-center text-center w-100" style="background-color: #dc3545; color:#ffff; cursor:pointer;">
        <a href="../../DB/logout.php">
        ยืนยันออกจากระบบ
        </a>
    </div>
</div>
</div>
</aside>

<div className="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen="750" style="height: 200px">
<iframe id="content" src="./dashboard.php"></iframe>
</div>

<footer className="main-footer d-flex justify-content-between align-items-center p-1" style="position: relative;">
<div className="copyright px-2">
<strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
</div>
<div className="d-none d-sm-inline px-2">
<img src="../resource/img/IT_logo.png" alt="Medlab Logo" className="img-fluid mx-2" style="height:auto; max-height:50px;">
<img src="../resource/img/SPU_logo.png" alt="Medlab Logo" className="img-fluid mx-2" style="height:auto; max-height:50px;">
</div>
</footer>

        </>
    )
}
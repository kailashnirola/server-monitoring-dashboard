from fastapi import APIRouter
import psutil

router = APIRouter()

@router.get("/cpu")
def cpu_usage():
    return {"percent": psutil.cpu_percent(interval=1)}

@router.get("/ram")
def ram_usage():
    mem = psutil.virtual_memory()
    return {"total": mem.total, "used": mem.used, "percent": mem.percent}

@router.get("/disk")
def disk_usage():
    disk = psutil.disk_usage('/')
    return {"total": disk.total, "used": disk.used, "percent": disk.percent}

@router.get("/network")
def network_traffic():
    net = psutil.net_io_counters()
    return {"bytes_sent": net.bytes_sent, "bytes_recv": net.bytes_recv}

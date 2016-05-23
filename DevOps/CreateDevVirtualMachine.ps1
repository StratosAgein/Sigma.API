# Settings
$subscription = Import-AzurePublishSettingsFile "PublishFiles\publish.publishsettings"
$storageAccount = "stratosagein"
$VMFamily = "Ubuntu Server 14.04 LTS"
$VMName = "SABackendNode"
$VMSize = "Small"
$DiskSize= 20
$DiskLabel = "C"
$LogicalUnitNumber = 1
$hcaching = "ReadWrite"
$CloudServiceName = "stratosagein"

# Selecting azure subscription
Select-AzureSubscription -SubscriptionName $subscription[0].Name -Current
# Selecting storageAccount
Set-AzureSubscription -SubscriptionName $subscription[0].Name -CurrentStorageAccountName $storageAccount

# Selecting Ubuntu Image
$UbuntuImage = Get-AzureVMImage | where { $_.ImageFamily -eq $VMFamily } | sort PublishedDate -Descending | select -ExpandProperty ImageName -First 1

$VirtualMachine = New-AzureVMConfig -Name $VMName -InstanceSize $VMSize -ImageName $UbuntuImage
$VirtualMachine | Add-AzureDataDisk -CreateNew -DiskSizeInGB $DiskSize -DiskLabel $DiskLabel -LUN $LogicalUnitNumber -HostCaching $hcaching
$VirtualMachine | Add-AzureProvisioningConfig -Windows -AdminUsername "thEpisode" -Password "Cami%3_2012"-NoRDPEndpoint -NoWinRMEndpoint

New-AzureVM -ServiceName CloudServiceName -VMs $VirtualMachine
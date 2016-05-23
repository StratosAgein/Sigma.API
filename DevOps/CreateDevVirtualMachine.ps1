# Settings
$subscription = Import-AzurePublishSettingsFile "PublishFiles\publish.publishsettings"
$storageAccount = "StratosStorage"
$VMFamily = "Ubuntu Server 14.04 LTS"
$VMName = "<machine name>"

# Selecting azure subscription
Select-AzureSubscription -SubscriptionName $subscription[0].Name –Current
# Selecting storageAccount
Set-AzureSubscription -SubscriptionName $subscription[0].Name -CurrentStorageAccountName $storageAccount

# Selecting Ubuntu Image
$UbuntuImage = Get-AzureVMImage | where { $_.ImageFamily -eq $VMFamily } | sort PublishedDate -Descending | select -ExpandProperty ImageName -First 1


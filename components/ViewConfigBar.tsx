import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { v4 as uuidv4 } from "uuid";
import { Article, ViewConfig } from "@/types/article";
import { 
  getUniquePeople, 
  getUniqueTags, 
  saveViewConfig, 
  getSavedViewConfigs,
  deleteViewConfig,
} from "@/lib/articles";
import { toast } from "sonner";

interface ViewConfigBarProps {
  articles: Article[];
  viewType: "table" | "card" | "calendar";
  sortBy: string;
  sortDirection: "asc" | "desc";
  search: string;
  selectedPeople: string[];
  selectedTags: string[];
  visibleColumns: string[];
  onViewTypeChange: (viewType: "table" | "card" | "calendar") => void;
  onSortChange: (field: string, direction: "asc" | "desc") => void;
  onSearchChange: (search: string) => void;
  onPeopleChange: (people: string[]) => void;
  onTagsChange: (tags: string[]) => void;
  onVisibleColumnsChange: (columns: string[]) => void;
  onViewConfigLoad: (config: ViewConfig) => void;
}

export default function ViewConfigBar({
  articles,
  viewType,
  sortBy,
  sortDirection,
  search,
  selectedPeople,
  selectedTags,
  visibleColumns,
  onViewTypeChange,
  onSortChange,
  onSearchChange,
  onPeopleChange,
  onTagsChange,
  onVisibleColumnsChange,
  onViewConfigLoad,
}: ViewConfigBarProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [newViewName, setNewViewName] = useState("");
  const [savedViews, setSavedViews] = useState<ViewConfig[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const availablePeople = getUniquePeople(articles);
  const availableTags = getUniqueTags(articles);

  // ローカルストレージから保存済みビューを読み込む
  useEffect(() => {
    try {
      const configs = getSavedViewConfigs();
      setSavedViews(configs);
    } catch (error) {
      console.error("Failed to load saved views:", error);
    }
  }, []);

  // 現在のビュー設定を保存
  const handleSaveView = () => {
    if (!newViewName.trim()) {
      toast.error("ビュー名を入力してください");
      return;
    }

    const newConfig: ViewConfig = {
      id: uuidv4(),
      name: newViewName.trim(),
      viewType,
      sortBy,
      sortDirection,
      filters: {
        search,
        people: selectedPeople,
        tags: selectedTags,
      },
      visibleColumns,
    };

    saveViewConfig(newConfig);
    
    // 保存済みビューリストを更新
    setSavedViews([...savedViews, newConfig]);
    setSaveDialogOpen(false);
    setNewViewName("");
    
    toast.success(`ビュー「${newViewName}」を保存しました`);
  };

  // 保存済みビューを削除
  const handleDeleteView = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteViewConfig(id);
    setSavedViews(savedViews.filter((view) => view.id !== id));
    toast.success(`ビュー「${name}」を削除しました`);
  };

  return (
    <div className="p-4 bg-background border-b space-y-4">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {/* ビュータイプ切り替え */}
        <div className="flex rounded-md overflow-hidden">
          <Button
            variant={viewType === "table" ? "default" : "outline"}
            onClick={() => onViewTypeChange("table")}
            className="rounded-r-none"
          >
            テーブル
          </Button>
          <Button
            variant={viewType === "card" ? "default" : "outline"}
            onClick={() => onViewTypeChange("card")}
            className="rounded-none border-x-0"
          >
            カード
          </Button>
          <Button
            variant={viewType === "calendar" ? "default" : "outline"}
            onClick={() => onViewTypeChange("calendar")}
            className="rounded-l-none"
          >
            カレンダー
          </Button>
        </div>

        {/* ソート設定 */}
        <div className="flex items-center gap-2">
          <Select
            value={sortBy}
            onValueChange={(value) => onSortChange(value, sortDirection)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="並び替え" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">タイトル</SelectItem>
              <SelectItem value="published_at">公開日</SelectItem>
              <SelectItem value="sort_index">インデックス</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() =>
              onSortChange(sortBy, sortDirection === "asc" ? "desc" : "asc")
            }
          >
            {sortDirection === "asc" ? "昇順" : "降順"}
          </Button>
        </div>

        {/* 検索入力 */}
        <div className="flex-grow">
          <Input
            placeholder="タイトルやタグで検索..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* ビューの保存/呼び出し */}
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">ビューを保存</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>カスタムビューの保存</DialogTitle>
              <DialogDescription>
                現在のビュー設定に名前をつけて保存します。
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="ビュー名を入力"
              value={newViewName}
              onChange={(e) => setNewViewName(e.target.value)}
              className="my-4"
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                キャンセル
              </Button>
              <Button onClick={handleSaveView}>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">保存済みビュー</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {savedViews.length === 0 ? (
              <DropdownMenuItem disabled>
                保存済みビューはありません
              </DropdownMenuItem>
            ) : (
              savedViews.map((view) => (
                <DropdownMenuItem
                  key={view.id}
                  className="flex justify-between items-center"
                  onSelect={() => {
                    onViewConfigLoad(view);
                    setMenuOpen(false);
                    toast.success(`ビュー「${view.name}」を適用しました`);
                  }}
                >
                  <span>{view.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 ml-2"
                    onClick={(e) => handleDeleteView(view.id, view.name, e)}
                  >
                    ✕
                  </Button>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* フィルタータグ */}
      <div className="flex flex-wrap gap-2">
        <div className="flex flex-wrap gap-1 items-center">
          <span className="text-sm font-medium">人物:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                選択 ({selectedPeople.length})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {availablePeople.map((person) => (
                <DropdownMenuItem
                  key={person}
                  onSelect={(e) => {
                    e.preventDefault();
                    onPeopleChange(
                      selectedPeople.includes(person)
                        ? selectedPeople.filter((p) => p !== person)
                        : [...selectedPeople, person]
                    );
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedPeople.includes(person)}
                      onCheckedChange={() => {}}
                    />
                    <span>{person}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedPeople.map((person) => (
            <Badge
              key={person}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {person}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() =>
                  onPeopleChange(selectedPeople.filter((p) => p !== person))
                }
              >
                ✕
              </Button>
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-1 items-center ml-4">
          <span className="text-sm font-medium">タグ:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                選択 ({selectedTags.length})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {availableTags.map((tag) => (
                <DropdownMenuItem
                  key={tag}
                  onSelect={(e) => {
                    e.preventDefault();
                    onTagsChange(
                      selectedTags.includes(tag)
                        ? selectedTags.filter((t) => t !== tag)
                        : [...selectedTags, tag]
                    );
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => {}}
                    />
                    <span>{tag}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {tag}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => onTagsChange(selectedTags.filter((t) => t !== tag))}
              >
                ✕
              </Button>
            </Badge>
          ))}
        </div>

        {/* 表示カラム設定 (テーブルビューの場合のみ) */}
        {viewType === "table" && (
          <div className="flex flex-wrap gap-1 items-center ml-4">
            <span className="text-sm font-medium">表示項目:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  選択 ({visibleColumns.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {[
                  { id: "title", label: "タイトル" },
                  { id: "published_at", label: "公開日" },
                  { id: "people", label: "人物" },
                  { id: "tags", label: "タグ" },
                  { id: "note_url", label: "URL" },
                ].map((column) => (
                  <DropdownMenuItem
                    key={column.id}
                    onSelect={(e) => {
                      e.preventDefault();
                      onVisibleColumnsChange(
                        visibleColumns.includes(column.id)
                          ? visibleColumns.filter((c) => c !== column.id)
                          : [...visibleColumns, column.id]
                      );
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={visibleColumns.includes(column.id)}
                        onCheckedChange={() => {}}
                      />
                      <span>{column.label}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
} 